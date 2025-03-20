'use client'

import { UseFormRegister, FieldError, FieldValues } from 'react-hook-form'

interface FormFieldProps {
  label: string
  name: string
  register: UseFormRegister<FieldValues>
  error?: any
  type?: string
  required?: boolean
  min?: number
  max?: number
  placeholder?: string
}

export default function FormField({
  label,
  name,
  register,
  error,
  type = 'text',
  required = false,
  min,
  max,
  placeholder,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        {...register(name, {
          required: required && '此字段为必填项',
          min: min !== undefined ? { value: min, message: `最小值为 ${min}` } : undefined,
          max: max !== undefined ? { value: max, message: `最大值为 ${max}` } : undefined,
        })}
        className={`block w-full rounded-md shadow-sm ${
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
        }`}
        placeholder={placeholder}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  )
} 