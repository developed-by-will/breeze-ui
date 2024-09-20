// hooks/useChangeComponent.ts
import { ComponentType } from '@/components/breeze-ui/config';
import { useGlobalStore } from '@/store';
import { useRouter } from 'next/navigation';

export const useChangeComponent = () => {
  const globalStore = useGlobalStore();
  const router = useRouter();

  const changeComponent = (component: ComponentType) => {
    globalStore.setComponent(component);
    router.push(`/component/${component.slug}`);
  };

  return { changeComponent };
};
