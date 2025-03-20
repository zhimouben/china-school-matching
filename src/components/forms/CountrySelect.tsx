import { useState, useRef, useEffect } from 'react';
import { countries } from 'countries-list';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { StudentFormData } from '@/types/form';

interface CountrySelectProps {
  register: UseFormRegister<StudentFormData>;
  setValue: UseFormSetValue<StudentFormData>;
  error?: any;
}

const countryList = Object.entries(countries).map(([code, country]) => ({
  code,
  name: country.name,
  native: country.native,
})).sort((a, b) => a.name.localeCompare(b.name));

export default function CountrySelect({ register, setValue, error }: CountrySelectProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = countryList.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.native.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (selectedCountry) {
          setSearchTerm(selectedCountry);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedCountry]);

  const handleCountrySelect = (code: string, name: string, native: string) => {
    const displayText = `${name} (${native})`;
    setValue('nationality', code, { shouldValidate: true });
    setSelectedCountry(displayText);
    setSearchTerm(displayText);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        setHighlightedIndex(0);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        setHighlightedIndex(prev => 
          prev < filteredCountries.length - 1 ? prev + 1 : prev
        );
        e.preventDefault();
        break;
      case 'ArrowUp':
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        e.preventDefault();
        break;
      case 'Enter':
        if (highlightedIndex >= 0 && highlightedIndex < filteredCountries.length) {
          const country = filteredCountries[highlightedIndex];
          handleCountrySelect(country.code, country.name, country.native);
        }
        e.preventDefault();
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        if (selectedCountry) {
          setSearchTerm(selectedCountry);
        }
        break;
    }
  };

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700">国籍</label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="搜索国家..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            if (!e.target.value) {
              setSelectedCountry('');
              setValue('nationality', '', { shouldValidate: true });
            }
          }}
          onFocus={() => {
            setIsOpen(true);
            if (selectedCountry) {
              setSearchTerm('');
            }
          }}
          onKeyDown={handleKeyDown}
        />
        <input type="hidden" {...register('nationality', { required: '请选择国籍' })} />
        
        {isOpen && filteredCountries.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredCountries.map(({ code, name, native }, index) => (
              <div
                key={code}
                className={`px-4 py-2 cursor-pointer ${
                  index === highlightedIndex ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleCountrySelect(code, name, native)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {name} ({native})
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message as string}</p>
      )}
    </div>
  );
} 