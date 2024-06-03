import './globals.css'

import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Poppins, Roboto, Roboto_Mono } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/providers/ThemeProvider'
import Providers from '@/lib/tanstack-query'
import { cn } from '@/lib/utils'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
})
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
  variable: '--font-roboto-mono',
})
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-poppins',
})

// sans: ['var(--font-inter)'],
// roboto: ['var(--font-roboto)'],
// poppins: ['var(--font-poppins)'],
// mono: ['var(--font-roboto-mono)'],

export const metadata: Metadata = {
  title: 'Call Food',
  description: 'Making people happy with our burgers',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn([
          'h-screen dark:bg-zinc-800',
          roboto.variable,
          robotoMono.variable,
          poppins.variable,
        ])}
      >
        <Providers>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
