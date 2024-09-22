import HomePage from '@/app/(pages)/homepage/page';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'BreezeUI',
    description: 'Build your projects with breeze'
  };
}

export default function Index() {
  return <HomePage />;
}
