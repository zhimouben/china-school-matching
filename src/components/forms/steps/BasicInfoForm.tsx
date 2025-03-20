import { UseFormReturn } from 'react-hook-form'
import FormField from '../FormField'

interface BasicInfoFormProps {
  form: UseFormReturn<any>
  onNext: () => void
}

export default function BasicInfoForm({ form, onNext }: BasicInfoFormProps) {
  const { register, handleSubmit, formState: { errors } } = form

  const onSubmit = (data: any) => {
    console.log('Basic info:', data)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      <div className="flex justify-end">
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