// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: {
    template: '%s | Flixzy.',
    default: 'Flixzy. - Stream Your Next Favorite Movie',
  },
  description: 'Welcome to Flixzy. Discover a vast collection of movies and series.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Tambahkan div pembungkus di sini */}
        <div className="site-wrapper">
          <Navbar />
          <main>{children}</main> {/* Bungkus children dengan <main> untuk semantik */}
        </div>
      </body>
    </html>
  );
}