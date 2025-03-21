'use client'

import { School } from '@/types/school'

interface SchoolCardProps {
  school: School
  isSelected: boolean
  onSelect: () => void
}

export default function SchoolCard({ school, isSelected, onSelect }: SchoolCardProps) {
  return (
    <div
      className={`
        relative bg-white rounded-xl shadow-md p-6 transition-all
        ${isSelected ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}
      `}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{school.name}</h3>
          <p className="text-gray-500">{school.location}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm text-gray-500">全国排名</div>
          <div className="text-xl font-semibold text-gray-900">#{school.ranking}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">匹配度</div>
          <div className="text-lg font-semibold text-blue-600">{school.matchScore}%</div>
        </div>
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 rounded-full h-2"
            style={{ width: `${school.matchScore}%` }}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          onClick={() => console.log('View details:', school.id)}
        >
          查看详情
        </button>
        <button
          onClick={onSelect}
          className={`
            px-4 py-2 rounded-md text-sm font-medium
            ${isSelected
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          {isSelected ? '取消选择' : '选择比较'}
        </button>
      </div>
    </div>
  )
} 