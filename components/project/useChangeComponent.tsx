import { ComponentType } from '@/registry/components/ui/metadata';
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
