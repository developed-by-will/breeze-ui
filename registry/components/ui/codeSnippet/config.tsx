/* For the preview */
import codeSource from '!!raw-loader!./index.tsx';
import { componentsMetadata, ComponentType } from '@/registry/components/ui/metadata';
import CodeSnippet from '.';

export const codeSnippet = codeSource;

/* For the example */
const code = `<html>
  <body>
    <div>
      <h1>Hello World</h1>
    </div>
  </body>
</html>`;
const example = <CodeSnippet codeSnippet={code} styleName="duotoneSpace" />;
const implementation_1 = `const codeExample = \`<p>Example without alert dialog</p>\`;

return (
    <div>
        <CodeSnippet
            codeSnippet={codeExample}
            styleName="vscDarkPlus"
        />
    </div>
)
`;

const implementation_2 = `const codeExample2 = \`<p>Example with alert dialog</p>\`;
 
return (
    <div>
        <CodeSnippet
            codeSnippet={codeExample2}
            styleName="vscDarkPlus"
            showAlert={true}
            alertTitle="Caution"
            alertMessage=" Some text here."
            alertDialogAction="Copy & Continue"
        />
    </div>
)
`;

export const config: ComponentType = {
  type: 'component',
  slug: componentsMetadata.codeSnippet.slug,
  name: componentsMetadata.codeSnippet.name,
  title: componentsMetadata.codeSnippet.title,
  description: componentsMetadata.codeSnippet.description,
  codeSnippet,
  example,
  implementation_1,
  implementation_2,
  addCommand: `npx shadcn add https://breeze-ui.wilsongomes.me/public/registry/components/${componentsMetadata.breadcrumbs.name}.json`
};
