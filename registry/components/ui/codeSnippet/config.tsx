/* For the preview */
import { componentsMetadata, ComponentType } from '@/registry/components/ui/metadata';
import CodeSnippet from '.';

const codeSnippet = `import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as PrismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

type StyleName = keyof typeof PrismStyles;

type PropsType =
  | {
      codeSnippet: string;
      styleName: StyleName;
      showAlert?: false;
    }
  | {
      codeSnippet: string;
      styleName: StyleName;
      showAlert: true;
      alertTitle: string;
      alertMessage: string;
      alertDialogAction: string;
    };

const CopyCode = ({ codeSnippet }: { codeSnippet: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(codeSnippet).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [codeSnippet]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 right-2 z-10 bg-primary-foreground"
      onClick={copyToClipboard}
    >
      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
};

const ShowAlertDialog = (props: PropsType) => {
  const { showAlert, codeSnippet } = props;

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(codeSnippet).then(() => {
      console.log('Close dialog');
    });
  }, [codeSnippet]);

  if (!showAlert) return;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 bg-primary-foreground"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{props.alertMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={copyToClipboard}>{props.alertDialogAction}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default function CodeSnippet(props: Readonly<PropsType>) {
  const { codeSnippet, styleName, showAlert } = props;
  const style = PrismStyles[styleName];

  return (
    <div className="relative">
      {showAlert ? (
        <ShowAlertDialog
          codeSnippet={codeSnippet}
          styleName={styleName}
          showAlert={showAlert}
          alertTitle={props.alertTitle}
          alertMessage={props.alertMessage}
          alertDialogAction={props.alertDialogAction}
        />
      ) : (
        <CopyCode codeSnippet={codeSnippet} />
      )}

      <SyntaxHighlighter
        language="typescript"
        style={style}
        wrapLongLines={true}
        customStyle={{
          margin: 0,
          borderRadius: '0.375rem',
          padding: '1rem'
        }}
      >
        {codeSnippet}
      </SyntaxHighlighter>
    </div>
  );
}
`;

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
  slug: componentsMetadata.codeSnippet.slug,
  name: componentsMetadata.codeSnippet.name,
  title: componentsMetadata.codeSnippet.title,
  description: componentsMetadata.codeSnippet.description,
  codeSnippet,
  example,
  implementation_1,
  implementation_2,
  addCommand:
    'npx shadcn add https://raw.githubusercontent.com/developed-by-will/breeze-ui/refs/heads/main/public/registry/components/codeSnippet.json'
};
