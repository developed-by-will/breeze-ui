import Code from '@/components/breeze-ui/code';
import SyntaxHighlighter from '@/components/breeze-ui/syntax-highlighter';

export const darkModeSteps = [
  {
    title: 'Install next-themes',
    content: <SyntaxHighlighter styleName="vscDarkPlus" codeSnippet="npm install next-themes" />
  },
  {
    title: 'Create a theme provider',
    content: (
      <div>
        <p className="font-medium pb-2">components/theme-provider.tsx</p>
        <SyntaxHighlighter
          styleName="vscDarkPlus"
          codeSnippet={`"use client"
   
  import * as React from "react"
  import { ThemeProvider as NextThemesProvider } from "next-themes"
  import { type ThemeProviderProps } from "next-themes/dist/types"
   
  export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
  }`}
        />
      </div>
    )
  },
  {
    title: 'Wrap your root layout',
    content: (
      <div>
        <p className="font-medium pb-2">
          Add the <Code>ThemeProvider</Code> to your root layout.
        </p>
        <p className="font-medium py-2">app/layout.tsx</p>
        <SyntaxHighlighter
          styleName="vscDarkPlus"
          codeSnippet={`import { ThemeProvider } from "@/components/theme-provider"
   
  export default function RootLayout({ children }: RootLayoutProps) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    )
  }`}
        />
      </div>
    )
  },
  {
    title: 'Add a mode toggle',
    content: (
      <div>
        <p className="font-medium pb-2">
          Place a mode toggle on your site to toggle between light and dark mode.
        </p>
        <SyntaxHighlighter
          styleName="vscDarkPlus"
          codeSnippet={`import { Moon, Sun } from 'lucide-react';
  
export default function ToggleExample() {
    const { setTheme, theme, systemTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <div className="flex items-center space-x-2">
            {currentTheme === 'light' ? (
                <Sun className="h-4 w-4 text-primary" />
            ) : (
                <Moon className="h-4 w-4 text-primary" />
            )}

            <Switch
                id="theme-switch"
                checked={currentTheme === 'dark'}
                className="bg-gray-500"
                onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
        </div>           
    )
}`}
        />
      </div>
    )
  }
];
