import HomePage from '@/app/(pages)/homepage/page';
import { Metadata } from 'next';
import { commonOpenGraph, commonSEO } from './commonSEO';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'breeze/ui';
  const description = 'Build your projects with breeze';

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

export default function Index() {
  return <HomePage />;
}
