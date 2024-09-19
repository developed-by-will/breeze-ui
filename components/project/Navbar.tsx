import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { components } from "@/components/breeze-ui/index";
import { ComponentType } from "@/types/componentType";
import { useGlobalStore } from "@/store";
import Logo from "./Logo";
import { Switch } from "@/components/project/Switch";

export default function Navbar() {
  const globalStore = useGlobalStore();
  const { setTheme, theme } = useTheme();

  const changeComponent = (component: ComponentType) => {
    globalStore.setComponent(component);
  };

  return (
    <div className="w-full flex justify-center bg-transparent backdrop-blur sticky top-0 z-50">
      <nav className="flex items-center justify-between p-4 text-primary container">
        <div className="flex items-center">
          <div className="block lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Components</SheetTitle>
                  <SheetDescription>
                    Choose the component you want to see
                  </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-5rem)] mt-4">
                  <div className="space-y-1">
                    {components.map((component) => (
                      <SheetClose asChild key={component.name}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => changeComponent(component)}
                        >
                          {component.name}
                        </Button>
                      </SheetClose>
                    ))}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>

          <Logo
            font1="text-4xl"
            font2="text-3xl"
            classes="space-x-[2px] hidden lg:flex"
          />
        </div>
        <Logo
          font1="text-4xl"
          font2="text-3xl"
          classes="space-x-[2px] flex lg:hidden"
        />
        <div className="flex items-center space-x-2">
          {theme === "light" ? (
            <Sun className="h-4 w-4 text-blue-500" />
          ) : (
            <Moon className="h-4 w-4 text-blue-500" />
          )}
          <Switch
            id="theme-switch"
            checked={theme === "dark"}
            className="bg-gray-500"
            onCheckedChange={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          />
        </div>
      </nav>
    </div>
  );
}
