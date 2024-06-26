import './globals.css'
import { DM_Sans } from 'next/font/google'
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const dmsans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmsans.variable}>
      <body className='bg-[#070815] text-white'>
        <Header />
        <main>
          {children}
        </main>
      </body>
      <Footer />
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
