import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/lib/hyfolio/theme.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'My Site',
  description: 'Built with hyfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
