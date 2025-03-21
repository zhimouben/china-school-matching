'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const filterSchema = z.object({
  nationality: z.string().min(1, '请选择国籍'),
  age: z.number().min(1, '请输入年龄'),
  email: z.string().email('请输入有效的邮箱地址'),
  phone: z.string().optional(),
  currentEducation: z.string().optional(),
  gpa: z.string().optional(),
  language: z.object({
    type: z.string().optional(),
    score: z.number().optional(),
  }).optional(),
  targetDegree: z.string().min(1, '请选择目标学位'),
  targetMajor: z.string().optional(),
  enrollmentYear: z.string().min(1, '请选择计划入学时间'),
  duration: z.number().optional(),
  budget: z.number().optional(),
  location: z.string().optional(),
  scholarship: z.string().min(1, '请选择奖学金需求'),
})

type FilterFormData = z.infer<typeof filterSchema>

export default function FilterPanel() {
  const [isEditing, setIsEditing] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      nationality: '中国',
      age: 20,
      email: 'example@email.com',
      currentEducation: '本科',
      gpa: '3.5',
      language: {
        type: 'HSK',
        score: 5,
      },
      targetDegree: '硕士',
      targetMajor: '计算机科学',
      enrollmentYear: '2025',
      duration: 2,
      budget: 20000,
      location: '北京',
      scholarship: '需要',
    }
  })

  const onSubmit = (data: FilterFormData) => {
    console.log(data)
    setIsEditing(false)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">个人信息</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-600 hover:text-blue-800"
        >
          {isEditing ? '取消' : '编辑'}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">国籍</label>
          <input
            type="text"
            {...register('nationality')}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          />
          {errors.nationality && (
            <p className="mt-1 text-sm text-red-600">{errors.nationality.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">年龄</label>
          <input
            type="number"
            {...register('age', { valueAsNumber: true })}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">邮箱</label>
          <input
            type="email"
            {...register('email')}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">当前学历</label>
          <select
            {...register('currentEducation')}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="高中">高中</option>
            <option value="本科">本科</option>
            <option value="硕士">硕士</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">GPA</label>
          <input
            type="text"
            {...register('gpa')}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">语言能力</label>
          <div className="mt-1 flex gap-2">
            <select
              {...register('language.type')}
              disabled={!isEditing}
              className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="HSK">HSK</option>
              <option value="雅思">雅思</option>
              <option value="托福">托福</option>
            </select>
            <input
              type="number"
              {...register('language.score', { valueAsNumber: true })}
              disabled={!isEditing}
              className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">目标学位</label>
          <select
            {...register('targetDegree')}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="高中">高中</option>
            <option value="本科">本科</option>
            <option value="硕士">硕士</option>
          </select>
          {errors.targetDegree && (
            <p className="mt-1 text-sm text-red-600">{errors.targetDegree.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">目标专业</label>
          <input
            type="text"
            {...register('targetMajor')}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">计划入学时间</label>
          <select
            {...register('enrollmentYear')}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
          {errors.enrollmentYear && (
            <p className="mt-1 text-sm text-red-600">{errors.enrollmentYear.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">预期留学时长（年）</label>
          <input
            type="number"
            {...register('duration', { valueAsNumber: true })}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">预算范围（美元/年）</label>
          <input
            type="number"
            {...register('budget', { valueAsNumber: true })}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">地理位置偏好</label>
          <input
            type="text"
            {...register('location')}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">奖学金需求</label>
          <select
            {...register('scholarship')}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="需要">需要</option>
            <option value="可有可无">可有可无</option>
          </select>
          {errors.scholarship && (
            <p className="mt-1 text-sm text-red-600">{errors.scholarship.message}</p>
          )}
        </div>

        {isEditing && (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            保存修改
          </button>
        )}
      </form>
    </div>
  )
} 