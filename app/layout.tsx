import CookieConsent from '@/components/project/CookieConsent';
import { Toaster } from '@/registry/components/ui/toast/toaster';
import './globals.css';
import Hydrate from './Hydrate';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Hydrate>{children}</Hydrate>

        <Toaster />
        <CookieConsent />
      </body>
    </html>
  );
}
