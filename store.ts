import { components } from '@/components/breeze-ui/index';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ComponentType } from './types/componentType';

type GlobalStoreType = {
  curComponent: ComponentType;
  setComponent: (component: ComponentType) => void;
  theme: string;
  setTheme: (theme: string) => void;
};

export const useGlobalStore = create<GlobalStoreType>()(
  persist(
    (set) => ({
      curComponent: {
        ...components[0]
      },
      setComponent: (component: ComponentType) => {
        set({ curComponent: component });
      },
      theme: 'light',
      setTheme: (theme: string) => {
        set({ theme });
      }
    }),
    { name: 'global-store' }
  )
);
