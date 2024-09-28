import Image from 'next/image';
import Link from 'next/link';

type PropsType = {
  width: number;
  height: number;
  classes?: string;
};

export default function Logo(props: Readonly<PropsType>) {
  const { width, height, classes } = props;

  return (
    <Link href="/" className={`flex items-center ${classes}`}>
      <Image src="/logo.png" alt="logo" width={width} height={height} />
    </Link>
  );
}
