import { ComponentType } from '@/registry/components/metadata';
import { useGlobalStore } from '@/store';
import { useRouter } from 'next/navigation';

export const useChangeComponent = () => {
  const globalStore = useGlobalStore();
  const router = useRouter();

  const changeComponent = (component: ComponentType) => {
    globalStore.setComponent(component);

    const slug = component.slug;
    const route = component.type === 'component' ? `/component/${slug}` : `/block/${slug}`;

    router.push(route);
  };

  return { changeComponent };
};
