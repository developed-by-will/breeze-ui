'use client';
import Breadcrumbs, { BreadcrumbType } from '@/components/breeze-ui/breadcrumbs';
import Sidebar from '@/components/project/Sidebar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

export default function Docs() {
  const breadcrumbs: BreadcrumbType[] = [{ text: 'Docs' }, { text: 'Introduction' }];

  return (
    <div className="flex justify-center">
      <div className="flex container">
        <aside className="w-64 border-r p-4 hidden lg:block">
          <Sidebar />
        </aside>

        <main className="flex-1 p-6 container space-y-10">
          {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} position="justify-start" />}

          <div>
            <h1 className="text-3xl font-bold mb-2">Docs</h1>
            <p className="text-muted-foreground">
              breeze/ui is a shadcn component library that you can bring into your apps by using the
              shadcn CLI.
            </p>
          </div>

          <div>
            <h2 className="mt-8 font-bold">Why use breeze/ui?</h2>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
            </div>

            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div>Simple</div>
              <Separator orientation="vertical" />
              <div>Type Safe</div>
              <Separator orientation="vertical" />
              <div>Lots of features</div>
            </div>

            <p className="text-muted-foreground mt-4 mb-10">
              breeze/ui components are created with both simplicity and feature richness. Everything
              is build with TypeScript and Tailwind CSS at its core.
            </p>
          </div>

          <div>
            <h2 className="mt-8 font-bold">Ready to use components</h2>
            <p className="text-muted-foreground mb-2">
              breeze/ui tries to accomodate a large variety of use cases while given you the liberty
              to customize to your own taste.
            </p>
          </div>

          <div>
            <h2 className="mt-8 font-bold text-2xl">FAQ</h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What other libraries does it use?</AccordionTrigger>
                <AccordionContent>
                  As for now we use other well-known libraries such as <b>next-themes</b>,{' '}
                  <b>react-syntax-highlighter</b> and <b>react-icons</b>. This list will likely grow
                  but by always making sure they are reliable.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How often do you update?</AccordionTrigger>
                <AccordionContent>
                  The project will continue to grow but please keep in mind that this is a project
                  of one person only. The growth will accour naturally and you can always contribute
                  by submitting a pull request.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <h2 className="mt-8 font-bold text-2xl mb-4">Changelog</h2>
            <ul className="list-disc list-inside">
              <li>
                <strong>v1.2.0</strong> - Add breadcrumbs component
              </li>
              <li>
                <strong>v2.0.6</strong> - Syntax Highlighter component update
              </li>
              <li>
                <strong>v2.1.0</strong> - Add Login-01 block
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
