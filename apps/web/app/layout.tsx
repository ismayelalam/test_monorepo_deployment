import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Todo',
  description: 'Testing monorepo deployment.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex items-center justify-center h-screen bg-accent-foreground">
          <Card className="w-xl space-y-6">
            <div className="flex items-center justify-center gap-4">
              <Link href="/" className="hover:underline font-semibold">
                Todo
              </Link>
              <Link href="/random" className="hover:underline font-semibold">
                Random
              </Link>
            </div>
            {children}
          </Card>
        </div>
      </body>
    </html>
  );
}
