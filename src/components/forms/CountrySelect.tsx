import { useState } from 'react';
import { countries } from 'countries-list';
import { UseFormRegister } from 'react-hook-form';
import { StudentFormData } from '@/types/form';

interface CountrySelectProps {
  register: UseFormRegister<StudentFormData>;
  error?: any;
}

const countryList = Object.entries(countries).map(([code, country]) => ({
  code,
  name: country.name,
  native: country.native,
}));

export default function CountrySelect({ register, error }: CountrySelectProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = countryList.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.native.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">国籍</label>
      <div className="relative">
        <input
          type="text"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-1"
          placeholder="搜索国家..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          {...register('nationality', { required: '请选择国籍' })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">请选择国籍</option>
          {filteredCountries.map(({ code, name, native }) => (
            <option key={code} value={code}>
              {name} ({native})
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message as string}</p>
      )}
    </div>
  );
} 