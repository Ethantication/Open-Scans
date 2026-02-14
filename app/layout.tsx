import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Open Scans - מאגר סריקות מבחנים לאוניברסיטה הפתוחה',
  description: 'מאגר סריקות מבחנים חינמי ופתוח לכל סטודנטי האוניברסיטה הפתוחה. העלו וצפו בסריקות מבחנים מכל הקורסים.',
  keywords: ['אוניברסיטה פתוחה', 'סריקות מבחנים', 'מבחנים', 'לימודים', 'Open University'],
  authors: [{ name: 'Ethan Hanoch', url: 'https://il.linkedin.com/in/ethanorjoseph' }],
  openGraph: {
    title: 'Open Scans - מאגר סריקות מבחנים',
    description: 'מאגר סריקות מבחנים חינמי לאוניברסיטה הפתוחה',
    type: 'website',
    locale: 'he_IL',
    siteName: 'Open Scans',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Scans - מאגר סריקות מבחנים',
    description: 'מאגר סריקות מבחנים חינמי לאוניברסיטה הפתוחה',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
