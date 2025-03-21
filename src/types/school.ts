export interface School {
  id: number
  name: string
  location: string
  ranking: number
  matchScore: number
}

export type TabId = 'all' | 'reach' | 'match' | 'safety'

export interface Tab {
  id: TabId
  name: string
  description?: string
}

export interface SchoolsByCategory {
  reach: School[]
  match: School[]
  safety: School[]
} 