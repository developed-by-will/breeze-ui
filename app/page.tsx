"use client";

import Logo from "@/components/project/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Component } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function HomePage() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col justify-center items-center">
      <header className="text-center mb-16 space-y-4">
        <Logo
          font1="text-8xl"
          font2="text-6xl"
          classes="justify-center space-x-2 mb-8 mt-20"
        />
        <p className="text-xl">
          Components created for Next.js based on Shadcn UI
        </p>
        <p
          className={`text-2xl font-semibold ${
            theme === "light" ? "text-blue-800" : "text-blue-500"
          }`}
        >
          Build your projects with breeze.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link
          href="https://discordapp.com/users/432294302153179147"
          target="_blank"
        >
          <Card
            className={`group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              theme === "light" ? "bg-white" : "bg-slate-800"
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-blue-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                  fill="currentColor"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Talk to me
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="opacity-70">
                Do you have an ideia or need help using these components? Add me
                on Discord.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="bg-blue-500 hover:bg-blue-500">
                Befriend: vir7ual.
              </Button>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/components">
          <Card
            className={`group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              theme === "light" ? "bg-white" : "bg-slate-800"
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Component className="w-6 h-6 text-green-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                Explore Components
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="opacity-70">
                Discover our customizable components to accelerate your
                React/Next.js projects.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="bg-green-500 hover:bg-green-500">
                View Components
              </Button>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </div>
  );
}
