import { UseFormReturn } from 'react-hook-form'
import FormField from '../FormField'

interface AcademicBackgroundFormProps {
  form: UseFormReturn<any>
  onNext: () => void
  onBack: () => void
}

export default function AcademicBackgroundForm({
  form,
  onNext,
  onBack,
}: AcademicBackgroundFormProps) {
  const { register, handleSubmit, formState: { errors } } = form

  const onSubmit = (data: any) => {
    console.log('Academic background:', data)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">语言能力</h3>
        
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
      </div>

      <FormField
        label="专业背景"
        name="major"
        register={register}
        error={errors.major}
        required
        placeholder="请输入您的专业"
      />

      <FormField
        label="主要学术成就"
        name="academicAchievements"
        register={register}
        error={errors.academicAchievements}
        placeholder="请描述您的主要学术成就（选填）"
      />

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-100 text-gray-600 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
        >
          上一步
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          下一步
        </button>
      </div>
    </form>
  )
} 