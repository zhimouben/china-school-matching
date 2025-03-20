"use client";

import React from 'react';
import { UseFormRegister, FieldError, ControllerRenderProps } from 'react-hook-form';
import { FormData } from '@/lib/schema';

interface FormInputProps {
  label: string;
  name: keyof FormData | string;
  register?: UseFormRegister<FormData>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur?: () => void;
}

export function FormInput({
  label,
  name,
  register,
  error,
  type = 'text',
  placeholder,
  required = false,
  options,
  className = '',
  value,
  onChange,
  onBlur,
}: FormInputProps) {
  const inputClasses = `mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${className}`;
  const errorClasses = 'mt-1 text-sm text-red-600';

  const inputProps = register 
    ? register(name as keyof FormData)
    : { value, onChange, onBlur };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'select' && options ? (
        <select {...inputProps} className={inputClasses}>
          <option value="">请选择...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          {...inputProps}
          className={`${inputClasses} min-h-[100px]`}
          placeholder={placeholder}
        />
      ) : type === 'checkbox' ? (
        <div className="mt-1">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...inputProps}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2">{placeholder}</span>
          </label>
        </div>
      ) : (
        <input
          type={type}
          {...inputProps}
          className={inputClasses}
          placeholder={placeholder}
        />
      )}
      {error && <p className={errorClasses}>{error.message}</p>}
    </div>
  );
} 