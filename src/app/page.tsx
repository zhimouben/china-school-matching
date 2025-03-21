'use client'

import { Metadata } from 'next'
import StudentForm from '@/components/forms/StudentForm'
import { useRouter } from 'next/navigation'

export const metadata: Metadata = {
  title: '中国留学学校匹配系统',
  description: '为国际学生提供智能化的中国高校匹配服务',
}

export default function Home() {
  const router = useRouter()

  const handleFormSubmit = () => {
    router.push('/recommendations')
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
          中国留学学校匹配系统
        </h1>
        <p className="text-center text-gray-600 mb-8">
          欢迎使用我们的智能匹配系统。请填写以下信息，我们将为您推荐最适合的中国高校和专业。
        </p>
        <StudentForm onSubmit={handleFormSubmit} />
      </div>
    </main>
  )
} 