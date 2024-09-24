import { componentsMetadata } from '@/registry/components/ui/metadata';
import { Metadata } from 'next';
import Component from '.';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  const component = Object.values(componentsMetadata).find((c) => c.slug === slug);

  return {
    title: component?.title,
    description: component?.description
  };
}

export default async function Index({ params }: Readonly<Props>) {
  return <Component slug={params.slug} />;
}
