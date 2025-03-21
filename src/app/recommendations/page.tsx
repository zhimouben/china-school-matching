'use client'

import { useState } from 'react'
import FilterPanel from '@/components/recommendations/FilterPanel'
import RecommendationTabs from '@/components/recommendations/RecommendationTabs'

export default function RecommendationsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'reach' | 'match' | 'safety'>('all')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">学校推荐结果</h1>
        <div className="flex gap-8">
          {/* 左侧筛选面板 */}
          <div className="w-1/3">
            <FilterPanel />
          </div>
          
          {/* 右侧推荐结果 */}
          <div className="w-2/3">
            <RecommendationTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>
      </div>
    </div>
  )
} 