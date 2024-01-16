import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
const inter = Inter({ subsets: ['latin'] })

import { Providers } from '@/providers'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="pt-br">
        <body className={inter.className}>
          <Providers>
            <main className="w-full h-screen dark text-foreground bg-background">
              {children}
            </main>
          </Providers>
          </body>
      </html>
  )
}
