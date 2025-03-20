'use client'

import { UseFormRegister, FieldError, Path, FieldValues, RegisterOptions } from 'react-hook-form'

interface FormFieldProps<T extends FieldValues> {
  label: string
  name: Path<T>
  type?: string
  register: UseFormRegister<T>
  error?: FieldError
  required?: boolean
  min?: number
  max?: number
  step?: number
  placeholder?: string
  validation?: RegisterOptions<T, Path<T>>
}

export default function FormField<T extends FieldValues>({
  label,
  name,
  type = 'text',
  register,
  error,
  required,
  min,
  max,
  step,
  placeholder,
  validation,
}: FormFieldProps<T>) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        {...register(name, {
          required: required ? '此字段为必填项' : false,
          min: min !== undefined ? { value: min, message: `不能小于${min}` } : undefined,
          max: max !== undefined ? { value: max, message: `不能大于${max}` } : undefined,
          ...validation,
        })}
        step={step}
        placeholder={placeholder}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  )
} 