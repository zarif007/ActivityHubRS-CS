import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Colorhydration from '@/lib/Colorhydration'
import { colorSchema } from '@/lib/ColorSchema'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`bg-[#030712]`}>
      <Colorhydration />
      <Navbar />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
