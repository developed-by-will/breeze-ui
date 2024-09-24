import { useChangeComponent } from '@/components/project/useChangeComponent';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { componentsConfig } from '@/registry/components/ui';
import { ComponentType } from '@/registry/components/ui/metadata';
import { useGlobalStore } from '@/store';

export default function Sidebar() {
  const globalStore = useGlobalStore();
  const theme = globalStore.theme;
  const { changeComponent } = useChangeComponent();

  return (
    <aside className="w-64 border-r p-4 hidden lg:block">
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="space-y-1">
          {componentsConfig.map((component: ComponentType) => (
            <Button
              key={component.name}
              variant="ghost"
              className={`w-full justify-start hover:bg-foreground/10 ${
                theme === 'light'
                  ? 'text-primary hover:bg-foreground/40 hover:text-primary'
                  : 'text-white hover:bg-foreground/50 hover:text-white'
              } ${component.name === globalStore.curComponent.name ? 'bg-foreground/30' : ''}`}
              onClick={() => changeComponent(component)}
            >
              {component.title}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
