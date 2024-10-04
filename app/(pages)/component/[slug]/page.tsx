import { commonOpenGraph, commonSEO } from '@/app/commonSEO';
import { componentsMetadata } from '@/registry/components/metadata';
import { Metadata } from 'next';
import Component from '.';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  const component = Object.values(componentsMetadata).find((c) => c.slug === slug);
  const title = 'breeze/ui - ' + component?.title;
  const description = component?.description;

  return {
    title,
    description: component?.description,
    ...commonSEO,
    openGraph: {
      title,
      description,
      ...commonOpenGraph
    }
  };
}

export default async function Index({ params }: Readonly<Props>) {
  return <Component slug={params.slug} />;
}
