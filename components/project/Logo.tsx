'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

type PropsType = {
  width: number;
  height: number;
  classes?: string;
};

export default function Logo(props: Readonly<PropsType>) {
  const { width, height, classes } = props;
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <Link href="/" className={`flex items-center ${classes}`}>
      <Image
        src={`${currentTheme === 'light' ? '/logo.png' : '/logo-night.png'}`}
        alt="logo"
        width={width}
        height={height}
        priority
      />
    </Link>
  );
}
