import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FC Dominators - Elite Football Club',
  description: 'Join FC Dominators, the premier sports club for elite football training, fitness programs, and competitive excellence.',
  keywords: 'football, soccer, training, sports club, dominators',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
