'use client';

import { useTheme } from 'next-themes';
import { ReactNode } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

type PropsType = {
  icon: JSX.Element;
  title: string;
  description: string;
  footer: JSX.Element;
  children?: ReactNode;
};

export default function HomepageCard(props: Readonly<PropsType>) {
  const { icon, title, description, footer, children } = props;
  const { theme } = useTheme();

  return (
    <Card
      className={`group transition-all duration-500 hover:shadow-lg hover:-translate-y-1 w-full ${
        theme === 'light' ? 'bg-white' : 'bg-slate-800'
      }`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon} {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!children && description}

        {children && <div>{children}</div>}
      </CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
}
