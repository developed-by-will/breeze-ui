'use client';

import { componentsConfig } from '@/registry/components/ui';
import Content from '../../(content)/content';

type PropsType = {
  slug: string;
};

export default function Component({ slug }: Readonly<PropsType>) {
  const component = Object.values(componentsConfig).find((c) => c.slug === slug);

  if (!component) {
    return <p>Component not found</p>;
  }

  return <Content component={component} />;
}
