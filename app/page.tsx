'use client';

import HomepageCard from '@/components/project/HomepageCard';
import Logo from '@/components/project/Logo';
import { Button } from '@/components/ui/button';
import { DiscordLogoIcon } from '@radix-ui/react-icons';
import { Component } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { theme } = useTheme();
  const [hasMinHeight, setHasMinHeight] = useState(false);

  useEffect(() => {
    const checkHeight = () => {
      setHasMinHeight(window.innerHeight >= 760);
    };

    checkHeight();
    window.addEventListener('resize', checkHeight);

    return () => window.removeEventListener('resize', checkHeight);
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen justify-center px-4 gap-16 ${
        hasMinHeight ? '-mt-[72px]' : ''
      }`}
    >
      <header className="text-center">
        <Logo
          font1="text-6xl md:text-8xl"
          font2="text-4xl md:text-6xl"
          classes="justify-center mb-8"
        />
        <p className="text-sm sm:text-2xl">Components created for Next.js based on Shadcn UI</p>
        <p
          className={`text-xl sm:text-2xl font-semibold ${
            theme === 'light' ? 'text-blue-800' : 'text-blue-500'
          }`}
        >
          Build your projects with breeze.
        </p>
      </header>

      <div className="grid md:grid-cols-2 max-w-4xl mx-auto gap-8">
        <Link href="https://discordapp.com/users/432294302153179147" target="_blank">
          <HomepageCard
            icon={
              <DiscordLogoIcon className="w-6 h-6 text-blue-500 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
            }
            title="Talk to me"
            description="Do you have an ideia or need help using these components? Add me on Discord."
            footer={<Button className="bg-blue-500 hover:bg-blue-500">Befriend: vir7ual.</Button>}
          />
        </Link>

        <Link href="/components">
          <HomepageCard
            icon={
              <Component className="w-6 h-6 text-green-500 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
            }
            title="Explore Components"
            description="Discover our customizable components to accelerate your React/Next.js projects."
            footer={<Button className="bg-green-500 hover:bg-green-500">View Components</Button>}
          />
        </Link>
      </div>
    </div>
  );
}
