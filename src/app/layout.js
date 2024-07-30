// app/layout.js
import { Inter, Roboto } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${roboto.className}`}>{children}</body>
    </html>
  );
}
