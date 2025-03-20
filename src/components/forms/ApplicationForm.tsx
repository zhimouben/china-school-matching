"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormData, formSchema } from '@/lib/schema';
import { FormInput } from '@/components/ui/FormInput';

export function ApplicationForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      languageScore: {
        type: 'HSK',
        score: ''
      },
      locationPreference: [],
      intendedMajors: [],
      budgetRange: {
        min: 0,
        max: 0
      },
      needScholarship: false
    }
  });

  const { handleSubmit, formState: { errors }, control } = form;

  const onSubmit = (data: FormData) => {
    console.log(data);
    // TODO: 处理表单提交
  };

  const cities = ['北京', '上海', '广州', '深圳', '其他一线城市', '二三线城市'];
  const majors = [
    '计算机科学与技术',
    '工商管理',
    '金融学',
    '机械工程',
    '电子信息工程',
    '医学',
    '建筑学',
    '法学',
    '其他'
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">申请信息</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 基本信息部分 */}
        <div className="space-y-4">
          <FormInput
            label="GPA"
            name="gpa"
            register={form.register}
            error={errors.gpa}
            type="number"
            placeholder="请输入 GPA（0-4.0）"
            required
          />

          {/* 语言成绩（非必填） */}
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="languageScore.type"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="语言成绩类型"
                  name="languageScore.type"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  type="select"
                  options={[
                    { value: 'HSK', label: 'HSK' },
                    { value: '雅思', label: '雅思' },
                    { value: '托福', label: '托福' }
                  ]}
                />
              )}
            />
            <Controller
              name="languageScore.score"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="语言成绩分数"
                  name="languageScore.score"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  type="number"
                />
              )}
            />
          </div>

          {/* 目标学位（必填） */}
          <FormInput
            label="目标学位"
            name="targetDegree"
            register={form.register}
            error={errors.targetDegree}
            type="select"
            required
            options={[
              { value: '本科', label: '本科' },
              { value: '硕士', label: '硕士' },
              { value: '博士', label: '博士' }
            ]}
          />

          {/* 意向专业（多选非必填） */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              意向专业
            </label>
            <div className="grid grid-cols-3 gap-2">
              {majors.map((major) => (
                <FormInput
                  key={major}
                  label={major}
                  name="intendedMajors"
                  register={form.register}
                  type="checkbox"
                  placeholder={major}
                />
              ))}
            </div>
          </div>

          {/* 意向城市（多选非必填） */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              意向城市
            </label>
            <div className="grid grid-cols-3 gap-2">
              {cities.map((city) => (
                <FormInput
                  key={city}
                  label={city}
                  name="locationPreference"
                  register={form.register}
                  type="checkbox"
                  placeholder={city}
                />
              ))}
            </div>
          </div>

          {/* 预算范围 */}
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="budgetRange.min"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="最低预算（万元/年）"
                  name="budgetRange.min"
                  value={field.value?.toString()}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  type="number"
                  required
                />
              )}
            />
            <Controller
              name="budgetRange.max"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="最高预算（万元/年）"
                  name="budgetRange.max"
                  value={field.value?.toString()}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  type="number"
                  required
                />
              )}
            />
          </div>

          {/* 奖学金需求 */}
          <FormInput
            label="奖学金需求"
            name="needScholarship"
            register={form.register}
            type="checkbox"
            placeholder="我需要奖学金支持"
          />
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            提交申请
          </button>
        </div>
      </form>
    </div>
  );
} 