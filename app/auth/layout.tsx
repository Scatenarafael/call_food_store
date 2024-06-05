import type { Metadata } from 'next'

// eslint-disable-next-line camelcase

// sans: ['var(--font-inter)'],
// roboto: ['var(--font-roboto)'],
// poppins: ['var(--font-poppins)'],
// mono: ['var(--font-roboto-mono)'],

export const metadata: Metadata = {
  title: 'Call Food',
  description: 'Making people happy with our burgers',
  icons: {
    icon: '../favicon.ico',
  },
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="h-screen font-roboto">{children}</div>
}
