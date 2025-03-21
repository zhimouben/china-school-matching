'use client'

import { useState } from 'react'
import SchoolCard from './SchoolCard'

interface School {
  id: string
  name: string
  location: string
  ranking: number
  matchScore: number
  category: 'reach' | 'match' | 'safety'
}

interface RecommendationTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: 'all', name: '全部', description: '所有推荐学校' },
  { id: 'reach', name: '冲刺', description: '难度较高但有可能的学校' },
  { id: 'match', name: '匹配', description: '难度适中的学校' },
  { id: 'safety', name: '保底', description: '基本能保证录取的学校' },
]

// 模拟数据
const mockSchools: School[] = [
  {
    id: '1',
    name: '清华大学',
    location: '北京',
    ranking: 1,
    matchScore: 85,
    category: 'reach'
  },
  {
    id: '2',
    name: '北京大学',
    location: '北京',
    ranking: 2,
    matchScore: 82,
    category: 'reach'
  },
  {
    id: '3',
    name: '浙江大学',
    location: '杭州',
    ranking: 3,
    matchScore: 78,
    category: 'match'
  },
  {
    id: '4',
    name: '上海交通大学',
    location: '上海',
    ranking: 4,
    matchScore: 75,
    category: 'match'
  },
  {
    id: '5',
    name: '南京大学',
    location: '南京',
    ranking: 5,
    matchScore: 72,
    category: 'safety'
  },
  {
    id: '6',
    name: '复旦大学',
    location: '上海',
    ranking: 6,
    matchScore: 70,
    category: 'safety'
  },
]

export default function RecommendationTabs({ activeTab, onTabChange }: RecommendationTabsProps) {
  const [selectedSchools, setSelectedSchools] = useState<string[]>([])

  const handleSchoolSelect = (schoolId: string) => {
    setSelectedSchools(prev => 
      prev.includes(schoolId) 
        ? prev.filter(id => id !== schoolId)
        : [...prev, schoolId]
    )
  }

  const filteredSchools = activeTab === 'all'
    ? mockSchools
    : mockSchools.filter(school => school.category === activeTab)

  return (
    <div className="bg-white rounded-lg shadow">
      {/* 标签导航 */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex-1 py-4 px-6 text-center text-sm font-medium
                ${activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <div className="font-medium">{tab.name}</div>
              <div className="text-xs text-gray-500">{tab.description}</div>
            </button>
          ))}
        </nav>
      </div>

      {/* 学校列表 */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map(school => (
            <SchoolCard
              key={school.id}
              school={school}
              isSelected={selectedSchools.includes(school.id)}
              onSelect={handleSchoolSelect}
            />
          ))}
        </div>

        {/* 操作按钮 */}
        {selectedSchools.length > 0 && (
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => setSelectedSchools([])}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              清除选择
            </button>
            <button
              onClick={() => console.log('比较学校:', selectedSchools)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              比较学校 ({selectedSchools.length})
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 