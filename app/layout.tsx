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
      </body>
    </html>
  );
}
