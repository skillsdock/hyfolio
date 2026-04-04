import type { Metadata } from 'next'
import '@/lib/hyfolio/theme.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'hyfolio Example Site',
  description: 'A complete site built with hyfolio blocks and templates.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground font-body antialiased">
        {children}
      </body>
    </html>
  )
}
