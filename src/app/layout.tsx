import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: '中国留学匹配系统',
  description: '为国际学生提供中国大学匹配服务',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
} 