'use client'

import { useRouter } from 'next/navigation'
import StudentForm from '@/components/forms/StudentForm'
import { StudentFormData } from '@/types/form'

export default function Home() {
  const router = useRouter()

  const handleFormSubmit = (data: StudentFormData) => {
    router.push('/recommendations')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          中国留学学校匹配系统
        </h1>
        <p className="mb-8 text-gray-600">
          请填写以下表单，我们将为您推荐最适合的中国高校。
        </p>
        <StudentForm onSubmit={handleFormSubmit} />
      </div>
    </main>
  )
} 