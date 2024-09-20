import { Metadata } from 'next';
import HomePage from './(pages)/homepage/page';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'BreezeUI',
    description: 'Build your projects with breeze'
  };
}

export default function Index() {
  return <HomePage />;
}
