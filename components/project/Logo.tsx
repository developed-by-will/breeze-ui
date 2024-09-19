import Link from 'next/link';

type PropsType = {
  font1: string;
  font2: string;
  classes?: string;
};

export default function Logo(props: Readonly<PropsType>) {
  const { font1, font2, classes } = props;

  return (
    <Link href="/" className={`flex items-center logo text-blue-500 ${classes}`}>
      <div className={`logo-font-1 ${font1}`}>Breeze</div>
      <div className={`logo-font-2 ${font2}`}>UI</div>
    </Link>
  );
}
