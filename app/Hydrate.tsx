'use client';

import Navbar from '@/components/project/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { StrictMode, useEffect, useState } from 'react';

export default function Hydrate({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <StrictMode>
      {isHydrated && (
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      )}
    </StrictMode>
  );
}
