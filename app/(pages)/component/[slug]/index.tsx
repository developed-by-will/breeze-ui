'use client';

import CodeSnippet from '@/components/breeze-ui/codeSnippet';
import Sidebar from '@/components/project/Sidebar';
import { componentsConfig } from '@/registry/components/ui';
import * as Tabs from '@radix-ui/react-tabs';
import { Blocks, Boxes } from 'lucide-react';
import { isValidElement } from 'react';

type PropsType = {
  slug: string;
};

export default function Component({ slug }: Readonly<PropsType>) {
  const component = Object.values(componentsConfig).find((c) => c.slug === slug);

  if (!component) {
    return <p>Component not found</p>;
  }

  const renderExample = (example: React.ReactNode) => {
    if (isValidElement(example)) {
      return example;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex container">
        <Sidebar />

        <main className="flex-1 p-6 container">
          <h1 className="text-3xl font-bold mb-2 ">{component.title}</h1>
          <p className="text-muted-foreground mb-6">{component.description}</p>

          <Tabs.Root defaultValue="preview">
            <Tabs.List className="flex ms-2">
              <Tabs.Trigger
                value="preview"
                className="px-4 py-2 border-transparent data-[state=active]:bg-primary/10 rounded-t-md"
              >
                Preview
              </Tabs.Trigger>
              <Tabs.Trigger
                value="code"
                className="px-4 py-2 border-transparent data-[state=active]:bg-primary/10 rounded-t-md"
              >
                Code
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="preview" className="p-4 border rounded-md space-y-6">
              {component.example && component.slug === 'login-01' ? (
                <div className="h-[550px]">
                  <div className="relative flex justify-center items-center h-full">
                    {renderExample(component.example)}
                  </div>
                </div>
              ) : (
                renderExample(component.example)
              )}

              <h2 className="flex pb-2 text-2xl font-semibold gap-2 items-center pt-6 border-b-2">
                <Boxes size={24} /> Installation
              </h2>

              <CodeSnippet codeSnippet={component.addCommand} styleName="vscDarkPlus" />

              <h2 className="flex pb-2 text-2xl font-semibold gap-2 items-center py-6 border-b-2">
                <Blocks size={24} /> Implementation examples
              </h2>

              <CodeSnippet codeSnippet={component.implementation_1} styleName="vscDarkPlus" />

              {component.implementation_2 && component.slug !== 'code-snippet' && (
                <CodeSnippet codeSnippet={component.implementation_2} styleName="vscDarkPlus" />
              )}

              {component.implementation_2 && component.slug === 'code-snippet' && (
                <CodeSnippet
                  codeSnippet={component.implementation_2}
                  styleName="vscDarkPlus"
                  showAlert={true}
                  alertTitle="Caution"
                  alertMessage=" Some text here."
                  alertDialogAction="Copy & Continue"
                />
              )}

              {component.implementation_3 && (
                <CodeSnippet codeSnippet={component.implementation_3} styleName="vscDarkPlus" />
              )}

              {component.implementation_4 && (
                <CodeSnippet codeSnippet={component.implementation_4} styleName="vscDarkPlus" />
              )}
            </Tabs.Content>
            <Tabs.Content value="code">
              <CodeSnippet codeSnippet={component.codeSnippet} styleName="vscDarkPlus" />
            </Tabs.Content>
          </Tabs.Root>
        </main>
      </div>
    </div>
  );
}
