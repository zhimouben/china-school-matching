'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput } from '../ui/FormInput';
import { StepIndicator } from '../ui/StepIndicator';

// 表单验证模式
const userProfileSchema = z.object({
  // 基本信息
  nationality: z.string().min(1, '请选择国籍'),
  age: z.number().min(18).max(35, '年龄必须在18-35岁之间'),
  gender: z.enum(['male', 'female', 'other']),
  email: z.string().email('请输入有效的邮箱地址'),
  phone: z.string().optional(),

  // 学术背景
  currentEducation: z.enum(['high_school', 'bachelor', 'master']),
  gpa: z.number().min(0).max(4, 'GPA必须在0-4之间'),
  languageScores: z.object({
    hsk: z.number().optional(),
    ielts: z.number().optional(),
    toefl: z.number().optional(),
  }),
  major: z.string().min(1, '请输入专业'),
  achievements: z.string().optional(),

  // 留学目标
  targetDegree: z.enum(['bachelor', 'master', 'phd']),
  targetMajor: z.string().min(1, '请输入目标专业'),
  enrollmentYear: z.number().min(new Date().getFullYear()),
  duration: z.number().min(1).max(6),

  // 个人偏好
  budget: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
  }),
  location: z.object({
    citySize: z.enum(['small', 'medium', 'large']),
    region: z.array(z.string()),
  }),
  climate: z.array(z.string()),
  schoolType: z.array(z.string()),
  needScholarship: z.boolean(),
});

type UserProfileFormData = z.infer<typeof userProfileSchema>;

const steps = [
  { id: 'basic', title: '基本信息' },
  { id: 'academic', title: '学术背景' },
  { id: 'target', title: '留学目标' },
  { id: 'preference', title: '个人偏好' },
];

export const UserProfileForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
  });

  const onSubmit = async (data: UserProfileFormData) => {
    try {
      // TODO: 发送数据到后端进行学校匹配
      console.log('提交的数据:', data);
    } catch (error) {
      console.error('提交失败:', error);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">基本信息</h3>
            <FormInput
              label="国籍"
              {...register('nationality')}
              error={errors.nationality?.message}
            />
            <FormInput
              label="年龄"
              type="number"
              {...register('age', { valueAsNumber: true })}
              error={errors.age?.message}
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium">性别</label>
              <select {...register('gender')} className="w-full p-2 border rounded">
                <option value="male">男</option>
                <option value="female">女</option>
                <option value="other">其他</option>
              </select>
            </div>
            <FormInput
              label="邮箱"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
            <FormInput
              label="电话（选填）"
              {...register('phone')}
              error={errors.phone?.message}
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">学术背景</h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium">当前学历</label>
              <select {...register('currentEducation')} className="w-full p-2 border rounded">
                <option value="high_school">高中</option>
                <option value="bachelor">本科</option>
                <option value="master">硕士</option>
              </select>
            </div>
            <FormInput
              label="GPA"
              type="number"
              step="0.01"
              {...register('gpa', { valueAsNumber: true })}
              error={errors.gpa?.message}
            />
            <div className="space-y-4">
              <h4 className="font-medium">语言成绩（选填）</h4>
              <FormInput
                label="HSK"
                type="number"
                {...register('languageScores.hsk', { valueAsNumber: true })}
                error={errors.languageScores?.hsk?.message}
              />
              <FormInput
                label="雅思"
                type="number"
                step="0.5"
                {...register('languageScores.ielts', { valueAsNumber: true })}
                error={errors.languageScores?.ielts?.message}
              />
              <FormInput
                label="托福"
                type="number"
                {...register('languageScores.toefl', { valueAsNumber: true })}
                error={errors.languageScores?.toefl?.message}
              />
            </div>
            <FormInput
              label="专业"
              {...register('major')}
              error={errors.major?.message}
            />
            <FormInput
              label="主要学术成就（选填）"
              {...register('achievements')}
              error={errors.achievements?.message}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">留学目标</h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium">目标学位</label>
              <select {...register('targetDegree')} className="w-full p-2 border rounded">
                <option value="bachelor">本科</option>
                <option value="master">硕士</option>
                <option value="phd">博士</option>
              </select>
            </div>
            <FormInput
              label="目标专业"
              {...register('targetMajor')}
              error={errors.targetMajor?.message}
            />
            <FormInput
              label="计划入学年份"
              type="number"
              {...register('enrollmentYear', { valueAsNumber: true })}
              error={errors.enrollmentYear?.message}
            />
            <FormInput
              label="预期留学时长（年）"
              type="number"
              {...register('duration', { valueAsNumber: true })}
              error={errors.duration?.message}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">个人偏好</h3>
            <div className="space-y-4">
              <h4 className="font-medium">预算范围（人民币/年）</h4>
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="最低"
                  type="number"
                  {...register('budget.min', { valueAsNumber: true })}
                  error={errors.budget?.min?.message}
                />
                <FormInput
                  label="最高"
                  type="number"
                  {...register('budget.max', { valueAsNumber: true })}
                  error={errors.budget?.max?.message}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">城市规模偏好</label>
              <select {...register('location.citySize')} className="w-full p-2 border rounded">
                <option value="small">小城市</option>
                <option value="medium">中等城市</option>
                <option value="large">大城市</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">地区偏好（可多选）</label>
              <div className="grid grid-cols-2 gap-2">
                {['华北', '华东', '华南', '西南', '东北', '西北', '华中'].map(region => (
                  <label key={region} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={region}
                      {...register('location.region')}
                      className="rounded"
                    />
                    <span>{region}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">气候偏好（可多选）</label>
              <div className="grid grid-cols-2 gap-2">
                {['温带', '亚热带', '热带', '寒带'].map(climate => (
                  <label key={climate} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={climate}
                      {...register('climate')}
                      className="rounded"
                    />
                    <span>{climate}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">学校类型偏好（可多选）</label>
              <div className="grid grid-cols-2 gap-2">
                {['综合', '理工', '医科', '艺术', '师范', '农林'].map(type => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={type}
                      {...register('schoolType')}
                      className="rounded"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('needScholarship')}
                className="rounded"
              />
              <label>需要奖学金</label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <StepIndicator steps={steps} currentStep={currentStep} />
      
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {renderStepContent()}
        
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            上一步
          </button>
          
          {currentStep === steps.length - 1 ? (
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              提交
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              下一步
            </button>
          )}
        </div>
      </form>
    </div>
  );
}; 