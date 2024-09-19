'use client';

import * as Tabs from '@radix-ui/react-tabs';
import Sidebar from '@/components/project/Sidebar';
import { useGlobalStore } from '@/store';
import CodeSnippet from '@/components/breeze-ui/CodeSnippet';
import { isValidElement } from 'react';
import { Blocks, Boxes } from 'lucide-react';

export default function Component() {
  const globalStore = useGlobalStore();

  const component = {
    ...globalStore.curComponent
  };

  const renderExample = (example: React.ReactNode) => {
    if (isValidElement(example)) {
      return example;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex container">
        <Sidebar />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-2 ">{component.name}</h1>
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
              {renderExample(component.example)}

              <h2 className="flex pb-2 text-2xl font-semibold gap-2 items-center pt-6 border-b-2">
                <Boxes size={24} /> Dependencies
              </h2>

              <CodeSnippet
                codeSnippet={component.dependencies}
                styleName="vscDarkPlus"
                showAlert={true}
                alertTitle="Caution"
                alertMessage="A prompt may appear. If you haven't customized that Shadcn component you can select Yes to override it. Otherwise, select No to keep your changes. Repeat the process for each prompt."
                alertDialogAction="Copy & Continue"
              />

              <h2 className="flex pb-2 text-2xl font-semibold gap-2 items-center py-6 border-b-2">
                <Blocks size={24} /> Implementation examples
              </h2>

              <CodeSnippet codeSnippet={component.implementation_1} styleName="vscDarkPlus" />

              {component.implementation_2 && (
                <CodeSnippet codeSnippet={component.implementation_2} styleName="vscDarkPlus" />
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
