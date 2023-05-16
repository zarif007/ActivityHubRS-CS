import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Colorhydration from '@/components/Colorhydration'
import { colorSchema } from '@/lib/ColorSchema'
import { Toaster } from '@/components/ui/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Activity Hub RS',
  description: 'Activity Hub RS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${colorSchema.background}`}>
      <Colorhydration />
      <Navbar />

      <Toaster position='bottom-center' />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
