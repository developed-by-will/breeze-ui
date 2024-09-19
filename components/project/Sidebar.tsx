import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { components } from '@/components/breeze-ui/index';
import { ComponentType } from '@/types/componentType';
import { useGlobalStore } from '@/store';

export default function Sidebar() {
  const globalStore = useGlobalStore();
  const theme = globalStore.theme;

  const changeComponent = (component: ComponentType) => {
    globalStore.setComponent(component);
  };

  return (
    <aside className="w-64 border-r p-4 hidden lg:block">
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="space-y-1">
          {components.map((component: ComponentType) => (
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
              {component.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
