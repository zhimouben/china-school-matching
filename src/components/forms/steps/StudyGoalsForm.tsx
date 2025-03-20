import { UseFormReturn } from 'react-hook-form'
import FormField from '../FormField'

interface StudyGoalsFormProps {
  form: UseFormReturn<any>
  onNext: () => void
  onBack: () => void
}

export default function StudyGoalsForm({
  form,
  onNext,
  onBack,
}: StudyGoalsFormProps) {
  const { register, handleSubmit, formState: { errors } } = form

  const onSubmit = (data: any) => {
    console.log('Study goals:', data)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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