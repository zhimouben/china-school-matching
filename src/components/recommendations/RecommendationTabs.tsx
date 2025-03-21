'use client'

import { useState } from 'react'
import { TabId, Tab, School, SchoolsByCategory } from '@/types/school'
import SchoolCard from '@/components/recommendations/SchoolCard'

interface RecommendationTabsProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const tabs: Tab[] = [
  { id: 'all', name: '全部' },
  { id: 'reach', name: '冲刺', description: '难度较高但有可能' },
  { id: 'match', name: '匹配', description: '难度适中' },
  { id: 'safety', name: '保底', description: '基本能保证录取' },
]

// 模拟数据
const mockSchools: SchoolsByCategory = {
  reach: [
    { id: 1, name: '清华大学', location: '北京', ranking: 1, matchScore: 85 },
    { id: 2, name: '北京大学', location: '北京', ranking: 2, matchScore: 82 },
    { id: 3, name: '复旦大学', location: '上海', ranking: 3, matchScore: 80 },
  ],
  match: [
    { id: 4, name: '上海交通大学', location: '上海', ranking: 4, matchScore: 92 },
    { id: 5, name: '浙江大学', location: '杭州', ranking: 5, matchScore: 90 },
    { id: 6, name: '南京大学', location: '南京', ranking: 6, matchScore: 88 },
    { id: 7, name: '中国科学技术大学', location: '合肥', ranking: 7, matchScore: 87 },
  ],
  safety: [
    { id: 8, name: '武汉大学', location: '武汉', ranking: 8, matchScore: 95 },
    { id: 9, name: '同济大学', location: '上海', ranking: 9, matchScore: 94 },
    { id: 10, name: '华中科技大学', location: '武汉', ranking: 10, matchScore: 93 },
  ],
}

export default function RecommendationTabs({ activeTab, onTabChange }: RecommendationTabsProps) {
  const [selectedSchools, setSelectedSchools] = useState<number[]>([])

  const handleSchoolSelect = (schoolId: number) => {
    setSelectedSchools(prev => {
      if (prev.includes(schoolId)) {
        return prev.filter(id => id !== schoolId)
      }
      return [...prev, schoolId]
    })
  }

  const getSchoolsForTab = () => {
    if (activeTab === 'all') {
      return [
        ...mockSchools.reach,
        ...mockSchools.match,
        ...mockSchools.safety,
      ]
    }
    return mockSchools[activeTab]
  }

  return (
    <div>
      {/* 标签页导航 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.name}
              {tab.id !== 'all' && (
                <span className="ml-2 text-gray-400">
                  ({mockSchools[tab.id].length})
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* 标签页说明 */}
      {activeTab !== 'all' && (
        <div className="mt-4 bg-blue-50 text-blue-700 px-4 py-2 rounded-md text-sm">
          {tabs.find(tab => tab.id === activeTab)?.description}
        </div>
      )}

      {/* 学校列表 */}
      <div className="mt-6 grid grid-cols-1 gap-6">
        {getSchoolsForTab().map(school => (
          <SchoolCard
            key={school.id}
            school={school}
            isSelected={selectedSchools.includes(school.id)}
            onSelect={() => handleSchoolSelect(school.id)}
          />
        ))}
      </div>

      {/* 比较按钮 */}
      {selectedSchools.length > 1 && (
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => console.log('Compare schools:', selectedSchools)}
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            比较已选择的 {selectedSchools.length} 所学校
          </button>
        </div>
      )}
    </div>
  )
} 