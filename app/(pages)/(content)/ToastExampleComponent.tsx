'use client';

import Steps from '@/components/breeze-ui/steps';
import SyntaxHighlighter from '@/components/breeze-ui/syntax-highlighter';
import { useToast } from '@/components/breeze-ui/toast/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ComponentType } from '@/registry/components/metadata';
import { Wrench } from 'lucide-react';
import { useEffect } from 'react';

type ToastExampleProps = {
  component: ComponentType;
};

export function ToastExampleComponent({ component }: ToastExampleProps) {
  const { toast } = useToast();

  const toastExample = component.example as {
    title?: string;
    description: string;
    variant: 'default' | 'destructive' | 'success' | 'warning' | 'info';
    duration: number;
    action: JSX.Element;
  };

  const toastExample_2 = component.example_2 as {
    title: string;
    description: string;
    duration: number;
    action: JSX.Element;
  };

  useEffect(() => {
    if (!component) return;

    toast({
      title: toastExample.title,
      description: toastExample.description,
      variant: toastExample.variant,
      duration: toastExample.duration,
      action: toastExample.action
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);

  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant="default"
        onClick={() => {
          toast({
            description: toastExample_2.description
          });
        }}
      >
        Simple Toast
      </Button>
      <Button
        variant="default"
        onClick={() => {
          toast({
            title: toastExample_2.title,
            description: toastExample_2.description,
            variant: 'destructive',
            duration: toastExample_2.duration,
            action: toastExample_2.action
          });
        }}
      >
        Destructive
      </Button>
      <Button
        variant="default"
        onClick={() => {
          toast({
            title: toastExample_2.title,
            description: toastExample_2.description,
            variant: 'success',
            duration: toastExample_2.duration,
            action: toastExample_2.action
          });
        }}
      >
        Success
      </Button>
      <Button
        variant="default"
        onClick={() => {
          toast({
            title: toastExample_2.title,
            description: toastExample_2.description,
            variant: 'warning',
            duration: toastExample_2.duration,
            action: toastExample_2.action
          });
        }}
      >
        Warning
      </Button>
      <Button
        variant="default"
        onClick={() => {
          toast({
            title: toastExample_2.title,
            description: toastExample_2.description,
            variant: 'info',
            duration: toastExample_2.duration,
            action: toastExample_2.action
          });
        }}
      >
        Info
      </Button>
    </div>
  );
}

export function ToastExampleComponentInstallation({ component }: ToastExampleProps) {
  const stepTwoCodeSnippet = `import { Toaster } from '@/components/breeze-ui/toast/toaster';
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}`;
  const stepsArray = [
    {
      title: 'Run the following command:',
      content: <SyntaxHighlighter codeSnippet={component.addCommand} styleName="vscDarkPlus" />
    },
    {
      title: 'Add the Toaster component',
      content: (
        <>
          <p className="text-muted-foreground mb-2">app/layout.tsx</p>
          <SyntaxHighlighter codeSnippet={stepTwoCodeSnippet} styleName="vscDarkPlus" />
        </>
      )
    }
  ];

  return (
    <>
      <h2 className="flex pb-2 text-2xl font-semibold gap-2 items-center pt-6 border-b-2">
        <Wrench size={24} /> Installation
      </h2>

      <div className="ps-4">
        <Steps steps={stepsArray} />
      </div>
    </>
  );
}
