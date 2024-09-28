import Component from '../component/[slug]';

type Props = {
  params: { slug: string };
};

export default async function Index({ params }: Readonly<Props>) {
  return <Component slug={params.slug} />;
}
