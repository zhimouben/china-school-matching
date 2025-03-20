import { Metadata } from 'next'
import StudentForm from '@/components/forms/StudentForm'

export const metadata: Metadata = {
  title: '中国留学学校匹配系统',
  description: '为国际学生提供智能化的中国高校匹配服务',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          中国留学学校匹配系统
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          欢迎使用我们的智能匹配系统。请填写以下信息，我们将为您推荐最适合的中国高校和专业。
        </p>
        <StudentForm />
      </div>
    </main>
  )
} 