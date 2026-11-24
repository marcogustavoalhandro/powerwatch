import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PowerWatch — Outage alerts',
  description: 'A nationwide power-outage alert and preparation dashboard.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
