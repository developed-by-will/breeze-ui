import { commonOpenGraph, commonSEO } from '@/app/commonSEO';
import { Metadata } from 'next';
import Component from '.';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'breeze/ui - Next.js Dark Mode';
  const description = 'Adding dark mode to your Next.js app.';

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
