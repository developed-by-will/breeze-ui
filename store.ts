import { componentsConfig } from '@/registry/default/ui';
import { ComponentType } from '@/registry/default/ui/metadata';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
        ...componentsConfig[0]
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
