import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '中国留学学校匹配系统',
  description: '为国际学生提供智能化的中国大学匹配服务',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
} 