import { useChangeComponent } from '@/components/project/useChangeComponent';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { blocksConfig, componentsConfig } from '@/registry/components/ui';
import { ComponentType } from '@/registry/components/ui/metadata';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const { changeComponent } = useChangeComponent();
  const router = useRouter();

  const components = Object.values(componentsConfig);
  const blocks = Object.values(blocksConfig);
  const btnClassName = 'w-full justify-start text-primary/80 hover:text-primary} mb-1';

  return (
    <Dialog>
      <ScrollArea className="h-screen">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium pb-2 text-start">Documentation</h4>
            <Button
              variant="link"
              className={btnClassName}
              onClick={() => {
                router.push('/docs');
              }}
            >
              Getting Started
            </Button>
            <Button
              variant="link"
              className={btnClassName}
              onClick={() => {
                router.push('/dark-mode');
              }}
            >
              Next.js Dark Mode
            </Button>
          </div>
          <div>
            <h4 className="font-medium pb-2 text-start">Components</h4>
            {components.map((component: ComponentType) => (
              <Button
                key={component.name}
                variant="link"
                className={btnClassName}
                onClick={() => {
                  changeComponent(component);
                }}
              >
                {component.title}
              </Button>
            ))}
          </div>
          <div>
            <h4 className="font-medium pb-2 text-start">Blocks</h4>
            {blocks.map((component: ComponentType) => (
              <Button
                key={component.name}
                variant="link"
                className={btnClassName}
                onClick={() => {
                  changeComponent(component);
                }}
              >
                {component.title}
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </Dialog>
  );
}
