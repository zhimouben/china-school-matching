'use client'

import { useForm } from 'react-hook-form'
import FormField from './FormField'

export default function StudentForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data: any) => {
    console.log('Form submitted:', data)
    // TODO: 实现表单提交逻辑
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* 基本信息 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">基本信息</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="国籍"
            name="nationality"
            register={register}
            error={errors.nationality}
            required
          />
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
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">性别</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('gender')}
                  value="male"
                  className="form-radio"
                />
                <span className="ml-2">男</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('gender')}
                  value="female"
                  className="form-radio"
                />
                <span className="ml-2">女</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('gender')}
                  value="other"
                  className="form-radio"
                />
                <span className="ml-2">其他</span>
              </label>
            </div>
          </div>
          <FormField
            label="电子邮箱"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            required
          />
          <FormField
            label="手机号码"
            name="phone"
            type="tel"
            register={register}
            error={errors.phone}
            required
          />
        </div>
      </div>

      {/* 学术背景 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">学术背景</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">当前学历</label>
            <select
              {...register('currentEducation')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="highSchool">高中</option>
              <option value="bachelor">本科</option>
              <option value="master">硕士</option>
            </select>
          </div>
          <FormField
            label="GPA"
            name="gpa"
            type="number"
            register={register}
            error={errors.gpa}
            required
            min={0}
            max={4}
            placeholder="请输入 GPA（0-4.0）"
          />
          <FormField
            label="HSK 等级"
            name="hskLevel"
            type="number"
            register={register}
            error={errors.hskLevel}
            min={1}
            max={6}
            placeholder="请输入 HSK 等级（1-6）"
          />
          <FormField
            label="雅思成绩"
            name="ieltsScore"
            type="number"
            register={register}
            error={errors.ieltsScore}
            min={0}
            max={9}
            placeholder="请输入雅思成绩（0-9）"
          />
          <FormField
            label="托福成绩"
            name="toeflScore"
            type="number"
            register={register}
            error={errors.toeflScore}
            min={0}
            max={120}
            placeholder="请输入托福成绩（0-120）"
          />
          <FormField
            label="专业背景"
            name="major"
            register={register}
            error={errors.major}
            required
            placeholder="请输入您的专业"
          />
        </div>
      </div>

      {/* 留学目标 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">留学目标</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">目标学位</label>
            <select
              {...register('targetDegree')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="bachelor">本科</option>
              <option value="master">硕士</option>
              <option value="phd">博士</option>
            </select>
          </div>
          <FormField
            label="意向专业"
            name="intendedMajor"
            register={register}
            error={errors.intendedMajor}
            required
            placeholder="请输入您想学习的专业"
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">计划入学时间</label>
            <div className="grid grid-cols-2 gap-4">
              <select
                {...register('enrollmentYear')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {[...Array(5)].map((_, i) => (
                  <option key={i} value={new Date().getFullYear() + i}>
                    {new Date().getFullYear() + i}
                  </option>
                ))}
              </select>
              <select
                {...register('enrollmentSemester')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="spring">春季学期</option>
                <option value="fall">秋季学期</option>
              </select>
            </div>
          </div>
          <FormField
            label="预期留学时长（年）"
            name="studyDuration"
            type="number"
            register={register}
            error={errors.studyDuration}
            required
            min={1}
            max={10}
            placeholder="请输入预期留学时长"
          />
        </div>
      </div>

      {/* 个人偏好 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">个人偏好</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="预算范围（人民币/年）"
            name="budget"
            type="number"
            register={register}
            error={errors.budget}
            required
            min={0}
            placeholder="请输入年度预算"
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">地理位置偏好</label>
            <select
              {...register('locationPreference')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="north">华北地区</option>
              <option value="east">华东地区</option>
              <option value="south">华南地区</option>
              <option value="central">华中地区</option>
              <option value="southwest">西南地区</option>
              <option value="northwest">西北地区</option>
              <option value="northeast">东北地区</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">学校类型偏好</label>
            <select
              {...register('schoolType')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="comprehensive">综合类</option>
              <option value="science">理工类</option>
              <option value="agriculture">农林类</option>
              <option value="medicine">医药类</option>
              <option value="normal">师范类</option>
              <option value="finance">财经类</option>
              <option value="art">艺术类</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">是否需要奖学金</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('needScholarship')}
                  value="yes"
                  className="form-radio"
                />
                <span className="ml-2">是</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('needScholarship')}
                  value="no"
                  className="form-radio"
                />
                <span className="ml-2">否</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 提交按钮 */}
      <div className="flex justify-center">
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