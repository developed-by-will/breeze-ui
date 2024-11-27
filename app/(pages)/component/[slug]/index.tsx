'use client';

import Content from '@/app/(pages)/(content)/content';
import { componentsConfig } from '@/registry/components';

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
