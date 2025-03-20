import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { StudentFormData, LanguageTest } from '@/types/form';

interface LanguageTestSelectProps {
  register: UseFormRegister<StudentFormData>;
  watch: UseFormWatch<StudentFormData>;
  error?: any;
}

const languageTests: { value: LanguageTest; label: string }[] = [
  { value: 'HSK', label: 'HSK' },
  { value: 'IELTS', label: '雅思' },
  { value: 'TOEFL', label: '托福' },
];

export default function LanguageTestSelect({ register, watch, error }: LanguageTestSelectProps) {
  const selectedTest = watch('languageTest.type');

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">语言能力（选填）</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          {...register('languageTest.type')}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">请选择语言考试</option>
          {languageTests.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        {selectedTest && (
          <input
            type="number"
            {...register('languageTest.score', {
              min: {
                value: 0,
                message: '分数不能小于0'
              },
              max: {
                value: selectedTest === 'HSK' ? 6 : selectedTest === 'IELTS' ? 9 : 120,
                message: `分数不能大于${selectedTest === 'HSK' ? 6 : selectedTest === 'IELTS' ? 9 : 120}`
              }
            })}
            placeholder={`请输入${selectedTest}分数`}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message as string}</p>
      )}
    </div>
  );
} 