import { SchoolType } from '@/components/SchoolCard';

export interface UserProfile {
  nationality: string;
  age: number;
  email: string;
  gpa: string;
  languageType: 'hsk' | 'toefl' | 'ielts';
  languageScore: string;
  targetDegree: 'bachelor' | 'master' | 'phd';
  targetMajor: string;
  scholarship: 'full' | 'partial' | 'none';
}

export interface School {
  name: string;
  ranking: number;
  location: string;
}

export interface Program {
  id: string;
  name: string;
  school: School;
  degree: 'bachelor' | 'master' | 'phd';
  major: string;
  matchScore: number;
  tuition: number;
  duration: string;
  language: string;
  scholarships: string[];
  requirements: {
    gpa: string;
    language: string;
    other?: string[];
  };
  type: SchoolType;
}

export interface RecommendationResult {
  reach: Program[];
  match: Program[];
  safety: Program[];
}

export async function getRecommendations(userProfile: UserProfile): Promise<RecommendationResult> {
  try {
    // 调用 deepseek-R1 API
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userProfile),
    });

    if (!response.ok) {
      throw new Error('推荐请求失败');
    }

    const recommendations = await response.json();
    return recommendations;
  } catch (error) {
    console.error('获取推荐失败:', error);
    // 如果 API 调用失败，返回空结果
    return {
      reach: [],
      match: [],
      safety: []
    };
  }
} 