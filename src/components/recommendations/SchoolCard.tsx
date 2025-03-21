'use client'

interface School {
  id: string
  name: string
  location: string
  ranking: number
  matchScore: number
  category: 'reach' | 'match' | 'safety'
}

interface SchoolCardProps {
  school: School
  isSelected: boolean
  onSelect: (id: string) => void
}

export default function SchoolCard({ school, isSelected, onSelect }: SchoolCardProps) {
  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'reach':
        return 'bg-red-100 text-red-800'
      case 'match':
        return 'bg-yellow-100 text-yellow-800'
      case 'safety':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div
      className={`
        relative bg-white rounded-lg shadow-sm border-2 p-6
        ${isSelected ? 'border-blue-500' : 'border-transparent'}
        hover:border-blue-300 transition-colors duration-200
        cursor-pointer
      `}
      onClick={() => onSelect(school.id)}
    >
      {/* 选择标记 */}
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}

      {/* 学校名称 */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{school.name}</h3>

      {/* 位置 */}
      <div className="flex items-center text-gray-500 mb-4">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {school.location}
      </div>

      {/* 匹配度和排名 */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-sm text-gray-500">匹配度</span>
          <div className={`text-lg font-semibold ${getMatchScoreColor(school.matchScore)}`}>
            {school.matchScore}%
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-500">排名</span>
          <div className="text-lg font-semibold text-gray-900">#{school.ranking}</div>
        </div>
      </div>

      {/* 分类标签 */}
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(school.category)}`}>
          {school.category === 'reach' ? '冲刺' : school.category === 'match' ? '匹配' : '保底'}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              console.log('查看详情:', school.id)
            }}
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
          >
            详情
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              console.log('申请学校:', school.id)
            }}
            className="px-3 py-1 text-sm text-green-600 hover:text-green-800"
          >
            申请
          </button>
        </div>
      </div>
    </div>
  )
} 