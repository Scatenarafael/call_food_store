import './globals.css'

import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Poppins, Roboto, Roboto_Mono } from 'next/font/google'

import { Header } from '@/components/header'
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
    <html lang="en">
      <body
        className={cn([
          'dark:bg-zinc-800',
          roboto.variable,
          robotoMono.variable,
          poppins.variable,
        ])}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
