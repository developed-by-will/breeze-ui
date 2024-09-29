import { commonOpenGraph, commonSEO } from '@/app/commonSEO';
import { Metadata } from 'next';
import Component from '.';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'breeze/ui - Documentation';
  const description =
    'breeze/ui is a shadcn component library that you can bring into your apps by using the shadcn CLI.';

  return {
    title,
    description,
    ...commonSEO,
    openGraph: {
      title,
      description,
      ...commonOpenGraph
    }
  };
}

export default async function Index() {
  return <Component />;
}
