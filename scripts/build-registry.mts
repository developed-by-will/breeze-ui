// @sts-nocheck
import 'dotenv/config';
import { existsSync, promises as fs } from 'fs';
import template from 'lodash.template';
import { tmpdir } from 'os';
import path from 'path';
import { cwd } from 'process';
import { rimraf } from 'rimraf';
import { Project, ScriptKind, SyntaxKind } from 'ts-morph';
import { z } from 'zod';

import { registry } from '../registry';
import { baseColors } from '../registry/registry-base-colors';
import { colorMapping, colors } from '../registry/registry-colors';

import {
  Registry,
  RegistryEntry,
  registryEntrySchema,
  registryItemTypeSchema,
  registrySchema
} from '../registry/schema';

const REGISTRY_PATH = path.join(process.cwd(), 'public/registry');

const REGISTRY_INDEX_WHITELIST: z.infer<typeof registryItemTypeSchema>[] = [
  'registry:ui',
  'registry:lib',
  'registry:hook',
  'registry:theme',
  'registry:block'
];

const project = new Project({
  compilerOptions: {}
});

async function createTempSourceFile(filename: string) {
  const dir = await fs.mkdtemp(path.join(tmpdir(), 'shadcn-'));
  return path.join(dir, filename);
}

// ----------------------------------------------------------------------------
// Build __registry__/index.tsx.
// ----------------------------------------------------------------------------
async function buildRegistry(registry: Registry) {
  let index = `// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from "react"

export const Index: Record<string, unknown> = {
`;

  index += `  "components": {`;

  for (const item of registry) {
    const resolveFiles = item.files?.map(
      (file) => `registry/components/${typeof file === 'string' ? file : file.path}`
    );
    if (!resolveFiles) {
      continue;
    }

    const type = item.type.split(':')[1];
    let sourceFilename = '';

    let chunks: any = [];
    if (item.type === 'registry:block') {
      const file = resolveFiles[0];
      const filename = path.basename(file);
      const raw = await fs.readFile(file, 'utf8');
      const tempFile = await createTempSourceFile(filename);
      const sourceFile = project.createSourceFile(tempFile, raw, {
        scriptKind: ScriptKind.TSX
      });

      // Find all imports.
      const imports = new Map<
        string,
        {
          module: string;
          text: string;
          isDefault?: boolean;
        }
      >();
      sourceFile.getImportDeclarations().forEach((node) => {
        const module = node.getModuleSpecifier().getLiteralValue();
        node.getNamedImports().forEach((item) => {
          imports.set(item.getText(), {
            module,
            text: node.getText()
          });
        });

        const defaultImport = node.getDefaultImport();
        if (defaultImport) {
          imports.set(defaultImport.getText(), {
            module,
            text: defaultImport.getText(),
            isDefault: true
          });
        }
      });

      // Find all opening tags with x-chunk attribute.
      const components = sourceFile
        .getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
        .filter((node) => {
          return node.getAttribute('x-chunk') !== undefined;
        });

      chunks = await Promise.all(
        components.map(async (component, index) => {
          const chunkName = `${item.name}-chunk-${index}`;

          // Get the value of x-chunk attribute.
          const attr = component
            .getAttributeOrThrow('x-chunk')
            .asKindOrThrow(SyntaxKind.JsxAttribute);

          const description = attr
            .getInitializerOrThrow()
            .asKindOrThrow(SyntaxKind.StringLiteral)
            .getLiteralValue();

          // Delete the x-chunk attribute.
          attr.remove();

          // Add a new attribute to the component.
          component.addAttribute({
            name: 'x-chunk',
            initializer: `"${chunkName}"`
          });

          // Get the value of x-chunk-container attribute.
          const containerAttr = component
            .getAttribute('x-chunk-container')
            ?.asKindOrThrow(SyntaxKind.JsxAttribute);

          const containerClassName = containerAttr
            ?.getInitializer()
            ?.asKindOrThrow(SyntaxKind.StringLiteral)
            .getLiteralValue();

          containerAttr?.remove();

          const parentJsxElement = component.getParentIfKindOrThrow(SyntaxKind.JsxElement);

          // Find all opening tags on component.
          const children = parentJsxElement
            .getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
            .map((node) => {
              return node.getTagNameNode().getText();
            })
            .concat(
              parentJsxElement
                .getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
                .map((node) => {
                  return node.getTagNameNode().getText();
                })
            );

          const componentImports = new Map<string, string | string[] | Set<string>>();
          children.forEach((child) => {
            const importLine = imports.get(child);
            if (importLine) {
              const imports = componentImports.get(importLine.module) || [];

              const newImports = importLine.isDefault
                ? importLine.text
                : new Set([...imports, child]);

              componentImports.set(
                importLine.module,
                importLine?.isDefault ? newImports : Array.from(newImports)
              );
            }
          });

          const componnetImportLines = Array.from(componentImports.keys()).map((key) => {
            const values = componentImports.get(key);
            const specifier = Array.isArray(values) ? `{${values.join(',')}}` : values;

            return `import ${specifier} from "${key}"`;
          });

          const code = `
            'use client'

            ${componnetImportLines.join('\n')}

            export default function Component() {
              return (${parentJsxElement.getText()})
            }`;

          const targetFile = file.replace(item.name, `${chunkName}`);
          const targetFilePath = path.join(cwd(), `registry/components/${type}/${chunkName}.tsx`);

          // Write component file.
          rimraf.sync(targetFilePath);
          await fs.writeFile(targetFilePath, code, 'utf8');

          return {
            name: chunkName,
            description,
            component: `React.lazy(() => import("@/registry/components/${type}/${chunkName}")),`,
            file: targetFile,
            container: {
              className: containerClassName
            }
          };
        })
      );

      // // Write the source file for blocks only.
      sourceFilename = `__registry__/components/${type}/${item.name}.tsx`;

      if (item.files) {
        const files = item.files.map((file) =>
          typeof file === 'string' ? { type: 'registry:page', path: file } : file
        );
        if (files?.length) {
          sourceFilename = `__registry__/components/${files[0].path}`;
        }
      }

      const sourcePath = path.join(process.cwd(), sourceFilename);
      if (!existsSync(sourcePath)) {
        await fs.mkdir(sourcePath, { recursive: true });
      }

      rimraf.sync(sourcePath);
      await fs.writeFile(sourcePath, sourceFile.getText());
    }

    let componentPath = `@/registry/components/${type}/${item.name}`;

    if (item.files) {
      const files = item.files.map((file) =>
        typeof file === 'string' ? { type: 'registry:page', path: file } : file
      );
      if (files?.length) {
        componentPath = `@/registry/components/${files[0].path}`;
      }
    }

    index += `
    "${item.name}": {
      name: "${item.name}",
      type: "${item.type}",
      registryDependencies: ${JSON.stringify(item.registryDependencies)},
      files: [${resolveFiles.map((file) => `"${file}"`)}],
      component: React.lazy(() => import("${componentPath}")),
      source: "${sourceFilename}",
      category: "${item.category}",
      subcategory: "${item.subcategory}",
      chunks: [${chunks.map(
        (chunk) => `{
        name: "${chunk.name}",
        description: "${chunk.description ?? 'No description'}",
        component: ${chunk.component}
        file: "${chunk.file}",
        container: {
          className: "${chunk.container.className}"
        }
      }`
      )}]
    },`;
  }

  index += `
  },`;

  index += `
}
`;

  // ----------------------------------------------------------------------------
  // Build registry/index.json.
  // ----------------------------------------------------------------------------
  const items = registry
    .filter((item) => ['registry:ui'].includes(item.type))
    .map((item) => {
      return {
        ...item,
        files: item.files?.map((_file) => {
          const file =
            typeof _file === 'string'
              ? {
                  path: _file,
                  type: item.type
                }
              : _file;

          return file;
        })
      };
    });
  const registryJson = JSON.stringify(items, null, 2);
  rimraf.sync(path.join(REGISTRY_PATH, 'index.json'));
  await fs.writeFile(path.join(REGISTRY_PATH, 'index.json'), registryJson, 'utf8');

  // Write index.
  rimraf.sync(path.join(process.cwd(), '__registry__/index.tsx'));
  await fs.writeFile(path.join(process.cwd(), '__registry__/index.tsx'), index);
}

// ----------------------------------------------------------------------------
// Build registry/components/[name].json.
// ----------------------------------------------------------------------------
async function buildComponents(registry: Registry) {
  const targetPath = path.join(REGISTRY_PATH, 'components');

  // Create directory if it doesn't exist.
  if (!existsSync(targetPath)) {
    await fs.mkdir(targetPath, { recursive: true });
  }

  for (const item of registry) {
    if (!REGISTRY_INDEX_WHITELIST.includes(item.type)) {
      continue;
    }

    let files;
    if (item.files) {
      files = await Promise.all(
        item.files.map(async (_file) => {
          const file =
            typeof _file === 'string'
              ? {
                  path: _file,
                  type: item.type,
                  content: '',
                  target: ''
                }
              : _file;

          const content = await fs.readFile(
            path.join(process.cwd(), 'registry', 'components', file.path),
            'utf8'
          );

          const tempFile = await createTempSourceFile(file.path);
          const sourceFile = project.createSourceFile(tempFile, content, {
            scriptKind: ScriptKind.TSX
          });

          sourceFile.getVariableDeclaration('iframeHeight')?.remove();
          sourceFile.getVariableDeclaration('containerClassName')?.remove();
          sourceFile.getVariableDeclaration('description')?.remove();

          return {
            path: file.path,
            type: file.type,
            content: sourceFile.getText(),
            target: file.target
          };
        })
      );
    }

    // Modified to use URLs for shadcn add.
    const payload = registryEntrySchema
      .omit({
        source: true,
        category: true,
        subcategory: true,
        chunks: true
      })
      .safeParse({
        ...item,
        ...(process.env.REGISTRY_URL
          ? {
              registryDependencies: item.registryDependencies?.map(
                (r) => `${process.env.REGISTRY_URL}/components/${r}.json`
              )
            }
          : {}),
        files
      });

    if (payload.success) {
      await fs.writeFile(
        path.join(targetPath, `${item.name}.json`),
        JSON.stringify(payload.data, null, 2),
        'utf8'
      );
    }
  }

  // ----------------------------------------------------------------------------
  // Build registry/index.json.
  // ----------------------------------------------------------------------------
  await fs.writeFile(path.join(REGISTRY_PATH, 'components/index.json'), 'utf8');
}

// ----------------------------------------------------------------------------
// Build registry/[name]/index.json.
// ----------------------------------------------------------------------------
async function buildComponentsIndex() {
  const targetPath = path.join(REGISTRY_PATH, 'components');

  const payload: RegistryEntry = {
    name: 'components',
    type: 'registry:ui',
    dependencies: ['tailwindcss-animate', 'class-variance-authority', 'lucide-react'],
    registryDependencies: ['utils'],
    tailwind: {
      config: {
        plugins: [`require("tailwindcss-animate")`]
      }
    },
    cssVars: {},
    files: []
  };

  await fs.writeFile(path.join(targetPath, 'index.json'), JSON.stringify(payload, null, 2), 'utf8');
}

// ----------------------------------------------------------------------------
// Build registry/colors/index.json.
// ----------------------------------------------------------------------------
async function buildThemes() {
  const colorsTargetPath = path.join(REGISTRY_PATH, 'colors');
  rimraf.sync(colorsTargetPath);
  if (!existsSync(colorsTargetPath)) {
    await fs.mkdir(colorsTargetPath, { recursive: true });
  }

  const colorsData: Record<string, any> = {};
  for (const [color, value] of Object.entries(colors)) {
    if (typeof value === 'string') {
      colorsData[color] = value;
      continue;
    }

    if (Array.isArray(value)) {
      colorsData[color] = value.map((item) => ({
        ...item,
        rgbChannel: item.rgb.replace(/^rgb\((\d+),(\d+),(\d+)\)$/, '$1 $2 $3'),
        hslChannel: item.hsl.replace(/^hsl\(([\d.]+),([\d.]+%),([\d.]+%)\)$/, '$1 $2 $3')
      }));
      continue;
    }

    if (typeof value === 'object') {
      colorsData[color] = {
        ...value,
        rgbChannel: value.rgb.replace(/^rgb\((\d+),(\d+),(\d+)\)$/, '$1 $2 $3'),
        hslChannel: value.hsl.replace(/^hsl\(([\d.]+),([\d.]+%),([\d.]+%)\)$/, '$1 $2 $3')
      };
      continue;
    }
  }

  await fs.writeFile(
    path.join(colorsTargetPath, 'index.json'),
    JSON.stringify(colorsData, null, 2),
    'utf8'
  );

  // ----------------------------------------------------------------------------
  // Build registry/colors/[base].json.
  // ----------------------------------------------------------------------------
  const BASE_STYLES = `@tailwind base;
@tailwind components;
@tailwind utilities;
  `;

  const BASE_STYLES_WITH_VARIABLES = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: <%- colors.light["background"] %>;
    --foreground: <%- colors.light["foreground"] %>;
    --card: <%- colors.light["card"] %>;
    --card-foreground: <%- colors.light["card-foreground"] %>;
    --popover: <%- colors.light["popover"] %>;
    --popover-foreground: <%- colors.light["popover-foreground"] %>;
    --primary: <%- colors.light["primary"] %>;
    --primary-foreground: <%- colors.light["primary-foreground"] %>;
    --secondary: <%- colors.light["secondary"] %>;
    --secondary-foreground: <%- colors.light["secondary-foreground"] %>;
    --muted: <%- colors.light["muted"] %>;
    --muted-foreground: <%- colors.light["muted-foreground"] %>;
    --accent: <%- colors.light["accent"] %>;
    --accent-foreground: <%- colors.light["accent-foreground"] %>;
    --destructive: <%- colors.light["destructive"] %>;
    --destructive-foreground: <%- colors.light["destructive-foreground"] %>;
    --border: <%- colors.light["border"] %>;
    --input: <%- colors.light["input"] %>;
    --ring: <%- colors.light["ring"] %>;
    --radius: 0.5rem;
    --chart-1: <%- colors.light["chart-1"] %>;
    --chart-2: <%- colors.light["chart-2"] %>;
    --chart-3: <%- colors.light["chart-3"] %>;
    --chart-4: <%- colors.light["chart-4"] %>;
    --chart-5: <%- colors.light["chart-5"] %>;
  }

  .dark {
    --background: <%- colors.dark["background"] %>;
    --foreground: <%- colors.dark["foreground"] %>;
    --card: <%- colors.dark["card"] %>;
    --card-foreground: <%- colors.dark["card-foreground"] %>;
    --popover: <%- colors.dark["popover"] %>;
    --popover-foreground: <%- colors.dark["popover-foreground"] %>;
    --primary: <%- colors.dark["primary"] %>;
    --primary-foreground: <%- colors.dark["primary-foreground"] %>;
    --secondary: <%- colors.dark["secondary"] %>;
    --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;
    --muted: <%- colors.dark["muted"] %>;
    --muted-foreground: <%- colors.dark["muted-foreground"] %>;
    --accent: <%- colors.dark["accent"] %>;
    --accent-foreground: <%- colors.dark["accent-foreground"] %>;
    --destructive: <%- colors.dark["destructive"] %>;
    --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;
    --border: <%- colors.dark["border"] %>;
    --input: <%- colors.dark["input"] %>;
    --ring: <%- colors.dark["ring"] %>;
    --chart-1: <%- colors.dark["chart-1"] %>;
    --chart-2: <%- colors.dark["chart-2"] %>;
    --chart-3: <%- colors.dark["chart-3"] %>;
    --chart-4: <%- colors.dark["chart-4"] %>;
    --chart-5: <%- colors.dark["chart-5"] %>;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;

  for (const baseColor of ['slate', 'gray', 'zinc', 'neutral', 'stone']) {
    const base: Record<string, any> = {
      inlineColors: {},
      cssVars: {}
    };
    for (const [mode, values] of Object.entries(colorMapping)) {
      base['inlineColors'][mode] = {};
      base['cssVars'][mode] = {};
      for (const [key, value] of Object.entries(values)) {
        if (typeof value === 'string') {
          // Chart colors do not have a 1-to-1 mapping with tailwind colors.
          if (key.startsWith('chart-')) {
            base['cssVars'][mode][key] = value;
            continue;
          }

          const resolvedColor = value.replace(/{{base}}-/g, `${baseColor}-`);
          base['inlineColors'][mode][key] = resolvedColor;

          const [resolvedBase, scale] = resolvedColor.split('-');
          const color = scale
            ? colorsData[resolvedBase].find((item: any) => item.scale === parseInt(scale))
            : colorsData[resolvedBase];
          if (color) {
            base['cssVars'][mode][key] = color.hslChannel;
          }
        }
      }
    }

    // Build css vars.
    base['inlineColorsTemplate'] = template(BASE_STYLES)({});
    base['cssVarsTemplate'] = template(BASE_STYLES_WITH_VARIABLES)({
      colors: base['cssVars']
    });

    await fs.writeFile(
      path.join(REGISTRY_PATH, `colors/${baseColor}.json`),
      JSON.stringify(base, null, 2),
      'utf8'
    );

    // ----------------------------------------------------------------------------
    // Build registry/themes.css
    // ----------------------------------------------------------------------------
    const THEME_STYLES_WITH_VARIABLES = `
.theme-<%- theme %> {
  --background: <%- colors.light["background"] %>;
  --foreground: <%- colors.light["foreground"] %>;

  --muted: <%- colors.light["muted"] %>;
  --muted-foreground: <%- colors.light["muted-foreground"] %>;

  --popover: <%- colors.light["popover"] %>;
  --popover-foreground: <%- colors.light["popover-foreground"] %>;

  --card: <%- colors.light["card"] %>;
  --card-foreground: <%- colors.light["card-foreground"] %>;

  --border: <%- colors.light["border"] %>;
  --input: <%- colors.light["input"] %>;

  --primary: <%- colors.light["primary"] %>;
  --primary-foreground: <%- colors.light["primary-foreground"] %>;

  --secondary: <%- colors.light["secondary"] %>;
  --secondary-foreground: <%- colors.light["secondary-foreground"] %>;

  --accent: <%- colors.light["accent"] %>;
  --accent-foreground: <%- colors.light["accent-foreground"] %>;

  --destructive: <%- colors.light["destructive"] %>;
  --destructive-foreground: <%- colors.light["destructive-foreground"] %>;

  --ring: <%- colors.light["ring"] %>;

  --radius: <%- colors.light["radius"] %>;
}

.dark .theme-<%- theme %> {
  --background: <%- colors.dark["background"] %>;
  --foreground: <%- colors.dark["foreground"] %>;

  --muted: <%- colors.dark["muted"] %>;
  --muted-foreground: <%- colors.dark["muted-foreground"] %>;

  --popover: <%- colors.dark["popover"] %>;
  --popover-foreground: <%- colors.dark["popover-foreground"] %>;

  --card: <%- colors.dark["card"] %>;
  --card-foreground: <%- colors.dark["card-foreground"] %>;

  --border: <%- colors.dark["border"] %>;
  --input: <%- colors.dark["input"] %>;

  --primary: <%- colors.dark["primary"] %>;
  --primary-foreground: <%- colors.dark["primary-foreground"] %>;

  --secondary: <%- colors.dark["secondary"] %>;
  --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;

  --accent: <%- colors.dark["accent"] %>;
  --accent-foreground: <%- colors.dark["accent-foreground"] %>;

  --destructive: <%- colors.dark["destructive"] %>;
  --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;

  --ring: <%- colors.dark["ring"] %>;
}`;

    const themeCSS = [];
    for (const theme of baseColors) {
      themeCSS.push(
        // @ts-ignore
        template(THEME_STYLES_WITH_VARIABLES)({
          colors: theme.cssVars,
          theme: theme.name
        })
      );
    }

    await fs.writeFile(path.join(REGISTRY_PATH, `themes.css`), themeCSS.join('\n'), 'utf8');

    // ----------------------------------------------------------------------------
    // Build registry/themes/[theme].json
    // ----------------------------------------------------------------------------
    rimraf.sync(path.join(REGISTRY_PATH, 'themes'));
    for (const baseColor of ['slate', 'gray', 'zinc', 'neutral', 'stone']) {
      const payload: Record<string, any> = {
        name: baseColor,
        label: baseColor.charAt(0).toUpperCase() + baseColor.slice(1),
        cssVars: {}
      };
      for (const [mode, values] of Object.entries(colorMapping)) {
        payload.cssVars[mode] = {};
        for (const [key, value] of Object.entries(values)) {
          if (typeof value === 'string') {
            const resolvedColor = value.replace(/{{base}}-/g, `${baseColor}-`);
            payload.cssVars[mode][key] = resolvedColor;

            const [resolvedBase, scale] = resolvedColor.split('-');
            const color = scale
              ? colorsData[resolvedBase].find((item: any) => item.scale === parseInt(scale))
              : colorsData[resolvedBase];
            if (color) {
              payload['cssVars'][mode][key] = color.hslChannel;
            }
          }
        }
      }

      const targetPath = path.join(REGISTRY_PATH, 'themes');

      // Create directory if it doesn't exist.
      if (!existsSync(targetPath)) {
        await fs.mkdir(targetPath, { recursive: true });
      }

      await fs.writeFile(
        path.join(targetPath, `${payload.name}.json`),
        JSON.stringify(payload, null, 2),
        'utf8'
      );
    }
  }
}

try {
  const result = registrySchema.safeParse(registry);

  if (!result.success) {
    console.error(result.error);
    process.exit(1);
  }

  await buildRegistry(result.data);
  await buildComponents(result.data);
  await buildComponentsIndex();
  await buildThemes();

  console.log('✅ Done!');
} catch (error) {
  console.error(error);
  process.exit(1);
}
