import '@payloadcms/next/css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Admin Panel',
  description: 'Payload CMS Admin',
}

export default function PayloadLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
