/* For the preview */
import codeSource from '!!raw-loader!./index.tsx';
import { componentsMetadata, ComponentType } from '@/registry/components/metadata';
import SyntaxHighlighter from '.';

export const syntaxHighlighter = codeSource;

/* For the example */
const code = `<html>
  <body>
    <div>
      <h1>Hello World</h1>
    </div>
  </body>
</html>`;
const example = <SyntaxHighlighter codeSnippet={code} styleName="duotoneSpace" />;
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
  slug: componentsMetadata.syntaxHighlighter.slug,
  name: componentsMetadata.syntaxHighlighter.name,
  title: componentsMetadata.syntaxHighlighter.title,
  description: componentsMetadata.syntaxHighlighter.description,
  codeSnippet: syntaxHighlighter,
  example,
  implementation_1,
  implementation_2,
  addCommand: `npx shadcn add https://breeze-ui.wilsongomes.me/public/registry/components/${componentsMetadata.syntaxHighlighter.name}.json`
};
