'use client';

import Content from '@/app/(pages)/(content)/content';
import { blocksConfig } from '@/registry/components/ui';

type PropsType = {
  slug: string;
};

export default function Component({ slug }: Readonly<PropsType>) {
  const component = Object.values(blocksConfig).find((c) => c.slug === slug);

  if (!component) {
    return <p>Component not found</p>;
  }

  return <Content component={component} />;
}
