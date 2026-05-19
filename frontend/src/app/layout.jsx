import './globals.css';

export const metadata = {
  title: 'FC Dominators - Elite Football Club',
  description: 'Join FC Dominators, the premier sports club for elite football training, fitness programs, and competitive excellence.',
  keywords: 'football, soccer, training, sports club, dominators',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
