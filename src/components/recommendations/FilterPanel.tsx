'use client'

import { useState } from 'react'
import { StudentFormData } from '@/types/form'
import CountrySelect from '../forms/CountrySelect'
import LanguageTestSelect from '../forms/LanguageTestSelect'
import { useForm } from 'react-hook-form'

export default function FilterPanel() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<StudentFormData>()
  const [isEditing, setIsEditing] = useState(false)

  const onSubmit = async (data: StudentFormData) => {
    console.log('Filter updated:', data)
    setIsEditing(false)
    // TODO: 实现筛选逻辑
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">筛选条件</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {isEditing ? '确认修改' : '修改筛选'}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 基本信息 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">基本信息</h3>
          <CountrySelect register={register} setValue={setValue} error={errors.nationality} />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">年龄</label>
            <input
              type="number"
              {...register('age', {
                required: '请输入年龄',
                min: { value: 16, message: '年龄不能小于16岁' },
                max: { value: 100, message: '年龄不能大于100岁' }
              })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={!isEditing}
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">邮箱</label>
            <input
              type="email"
              {...register('email', { required: '请输入邮箱' })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={!isEditing}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* 学术背景 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">学术背景</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">GPA</label>
            <input
              type="number"
              step="0.01"
              {...register('gpa', {
                required: '请输入GPA',
                min: { value: 0, message: 'GPA不能小于0' },
                max: { value: 4, message: 'GPA不能大于4' }
              })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={!isEditing}
            />
            {errors.gpa && (
              <p className="mt-1 text-sm text-red-600">{errors.gpa.message}</p>
            )}
          </div>

          <LanguageTestSelect register={register} watch={watch} error={errors.languageTest} />
        </div>

        {/* 留学目标 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">留学目标</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">目标学位</label>
            <select
              {...register('targetDegree', { required: '请选择目标学位' })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={!isEditing}
            >
              <option value="">请选择目标学位</option>
              <option value="bachelor">本科</option>
              <option value="master">硕士</option>
              <option value="phd">博士</option>
            </select>
            {errors.targetDegree && (
              <p className="mt-1 text-sm text-red-600">{errors.targetDegree.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">目标专业</label>
            <input
              type="text"
              {...register('targetMajor', { required: '请输入目标专业' })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={!isEditing}
            />
            {errors.targetMajor && (
              <p className="mt-1 text-sm text-red-600">{errors.targetMajor.message}</p>
            )}
          </div>
        </div>

        {/* 奖学金需求 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">奖学金需求</h3>
          <div className="space-y-2">
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('needScholarship', { required: '请选择是否需要奖学金' })}
                  value="needed"
                  className="form-radio"
                  disabled={!isEditing}
                />
                <span className="ml-2">需要</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('needScholarship', { required: '请选择是否需要奖学金' })}
                  value="optional"
                  className="form-radio"
                  disabled={!isEditing}
                />
                <span className="ml-2">可有可无</span>
              </label>
            </div>
            {errors.needScholarship && (
              <p className="mt-1 text-sm text-red-600">{errors.needScholarship.message}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              更新筛选条件
            </button>
          </div>
        )}
      </form>
    </div>
  )
} 