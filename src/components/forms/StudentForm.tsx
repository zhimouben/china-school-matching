'use client'

import { useForm } from 'react-hook-form'
import FormField from './FormField'
import CountrySelect from './CountrySelect'
import LanguageTestSelect from './LanguageTestSelect'
import { StudentFormData } from '@/types/form'

type DegreeType = 'bachelor' | 'master' | 'phd'
type ScholarshipType = 'needed' | 'optional'

interface StudentFormProps {
  onSubmit?: (data: StudentFormData) => void
}

export default function StudentForm({ onSubmit }: StudentFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<StudentFormData>()

  const handleFormSubmit = (data: StudentFormData) => {
    console.log('Form submitted:', data)
    onSubmit?.(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 国籍 */}
        <CountrySelect register={register} setValue={setValue} error={errors.nationality} />

        {/* 年龄 */}
        <FormField
          label="年龄"
          name="age"
          type="number"
          register={register}
          error={errors.age}
          required
          min={16}
          max={100}
        />

        {/* 邮箱 */}
        <FormField
          label="邮箱"
          name="email"
          type="email"
          register={register}
          error={errors.email}
          required
          placeholder="请输入邮箱地址"
        />

        {/* GPA */}
        <FormField
          label="GPA"
          name="gpa"
          type="number"
          register={register}
          error={errors.gpa}
          required
          min={0}
          max={4}
          step={0.01}
          placeholder="请输入 GPA（0-4.0）"
        />

        {/* 目标学位 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">目标学位</label>
          <select
            {...register('targetDegree', { required: '请选择目标学位' })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">请选择目标学位</option>
            <option value="bachelor">本科</option>
            <option value="master">硕士</option>
            <option value="phd">博士</option>
          </select>
          {errors.targetDegree && (
            <p className="mt-1 text-sm text-red-600">{errors.targetDegree.message as string}</p>
          )}
        </div>

        {/* 目标专业 */}
        <FormField
          label="目标专业"
          name="targetMajor"
          register={register}
          error={errors.targetMajor}
          required
          placeholder="请输入目标专业"
        />

        {/* 语言能力 */}
        <div className="md:col-span-2">
          <LanguageTestSelect
            register={register}
            watch={watch}
            error={errors.languageTest}
          />
        </div>

        {/* 奖学金需求 */}
        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">奖学金需求</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                {...register('needScholarship', { required: '请选择是否需要奖学金' })}
                value="needed"
                className="form-radio"
              />
              <span className="ml-2">需要</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                {...register('needScholarship', { required: '请选择是否需要奖学金' })}
                value="optional"
                className="form-radio"
              />
              <span className="ml-2">可有可无</span>
            </label>
          </div>
          {errors.needScholarship && (
            <p className="mt-1 text-sm text-red-600">{errors.needScholarship.message as string}</p>
          )}
        </div>
      </div>

      {/* 提交按钮 */}
      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors text-lg"
        >
          开始匹配
        </button>
      </div>
    </form>
  )
} 