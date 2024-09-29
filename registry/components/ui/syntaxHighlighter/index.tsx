import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Prism as ReactSyntaxHighlighter } from 'react-syntax-highlighter';
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

const ShowAlertDialog = (props: Readonly<PropsType>) => {
  const { showAlert, codeSnippet } = props;

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(codeSnippet);
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
          <AlertDialogTitle className="text-primary">{props.alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{props.alertMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-primary">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={copyToClipboard} className="text-secondary">
            {props.alertDialogAction}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default function SyntaxHighlighter(props: Readonly<PropsType>) {
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

      <ReactSyntaxHighlighter
        language="typescript"
        style={style}
        wrapLongLines={true}
        customStyle={{
          margin: 0,
          borderRadius: '0.375rem',
          padding: '1rem',
          minHeight: '55px'
        }}
      >
        {codeSnippet}
      </ReactSyntaxHighlighter>
    </div>
  );
}
