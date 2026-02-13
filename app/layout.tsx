import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Open Scans - מאגר סריקות מבחנים',
  description: 'מאגר סריקות מבחנים לאוניברסיטה הפתוחה',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
