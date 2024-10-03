'use client';

import Breadcrumbs, { BreadcrumbType } from '@/components/breeze-ui/breadcrumbs';
import SyntaxHighlighter from '@/components/breeze-ui/syntax-highlighter';
import useRenderExample from '@/hooks/useRenderExample';
import { ComponentType } from '@/registry/components/ui/metadata';
import * as Tabs from '@radix-ui/react-tabs';
import { Blocks, Boxes } from 'lucide-react';

type PropsType = {
  component: ComponentType;
};

export default function Content(props: Readonly<PropsType>) {
  const { component } = props;

  const breadcrumbs: BreadcrumbType[] = [{ text: component.type }, { text: component.title }];
  const renderExample = useRenderExample(component.example);

  return (
    <>
      {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} position="justify-start" />}

      <h1 className="text-3xl font-bold mb-2">{component.title}</h1>
      <p className="text-muted-foreground mb-6">{component.description}</p>

      <Tabs.Root defaultValue="preview">
        <Tabs.List className="flex ms-2">
          <Tabs.Trigger
            value="preview"
            className="px-4 py-2 border-transparent data-[state=active]:bg-primary/10 rounded-t-md z-10"
          >
            Preview
          </Tabs.Trigger>
          <Tabs.Trigger
            value="code"
            className="px-4 py-2 border-transparent data-[state=active]:bg-primary/10 rounded-t-md z-10"
          >
            Code
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="preview" className="p-4 border rounded-md space-y-6">
          {component.example && component.slug === 'login-01' ? (
            <div className="h-[650px]">
              <div className="relative flex justify-center items-center h-full">
                {renderExample}
              </div>
            </div>
          ) : (
            renderExample
          )}

          <h2 className="flex pb-2 text-2xl font-semibold gap-2 items-center pt-6 border-b-2">
            <Boxes size={24} /> CLI
          </h2>

          <SyntaxHighlighter codeSnippet={component.addCommand} styleName="vscDarkPlus" />

          <h2 className="flex pb-2 text-2xl font-semibold gap-2 items-center py-6 border-b-2">
            <Blocks size={24} /> Usage
          </h2>

          <SyntaxHighlighter codeSnippet={component.implementation_1} styleName="vscDarkPlus" />

          {component.implementation_2 && component.slug !== 'syntax-highlighter' && (
            <SyntaxHighlighter codeSnippet={component.implementation_2} styleName="vscDarkPlus" />
          )}

          {component.implementation_2 && component.slug === 'syntax-highlighter' && (
            <SyntaxHighlighter
              codeSnippet={component.implementation_2}
              styleName="vscDarkPlus"
              showAlert={true}
              alertTitle="Caution"
              alertMessage=" Some text here."
              alertDialogAction="Copy & Continue"
            />
          )}

          {component.implementation_3 && (
            <SyntaxHighlighter codeSnippet={component.implementation_3} styleName="vscDarkPlus" />
          )}

          {component.implementation_4 && (
            <SyntaxHighlighter codeSnippet={component.implementation_4} styleName="vscDarkPlus" />
          )}
        </Tabs.Content>
        <Tabs.Content value="code">
          <SyntaxHighlighter codeSnippet={component.codeSnippet} styleName="vscDarkPlus" />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}
