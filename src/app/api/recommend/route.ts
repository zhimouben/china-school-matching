import { NextResponse } from 'next/server';
import type { UserProfile, RecommendationResult } from '@/services/recommendationService';

export async function POST(request: Request) {
  try {
    const userProfile: UserProfile = await request.json();

    // TODO: 这里需要替换为实际的 deepseek-R1 API 调用
    // 目前使用模拟数据
    const mockRecommendations: RecommendationResult = {
      reach: [
        {
          name: "清华大学",
          ranking: 1,
          location: "北京",
          matchScore: 85,
          tuition: 30000,
          scholarships: ["中国政府奖学金", "清华大学奖学金"],
          type: "reach"
        },
        {
          name: "北京大学",
          ranking: 2,
          location: "北京",
          matchScore: 82,
          tuition: 28000,
          scholarships: ["中国政府奖学金", "北京大学奖学金"],
          type: "reach"
        }
      ],
      match: [
        {
          name: "浙江大学",
          ranking: 3,
          location: "杭州",
          matchScore: 90,
          tuition: 25000,
          scholarships: ["中国政府奖学金", "浙江大学奖学金"],
          type: "match"
        },
        {
          name: "上海交通大学",
          ranking: 4,
          location: "上海",
          matchScore: 88,
          tuition: 26000,
          scholarships: ["中国政府奖学金", "上海交大奖学金"],
          type: "match"
        }
      ],
      safety: [
        {
          name: "南京大学",
          ranking: 5,
          location: "南京",
          matchScore: 95,
          tuition: 22000,
          scholarships: ["中国政府奖学金", "南京大学奖学金"],
          type: "safety"
        },
        {
          name: "武汉大学",
          ranking: 6,
          location: "武汉",
          matchScore: 92,
          tuition: 20000,
          scholarships: ["中国政府奖学金", "武汉大学奖学金"],
          type: "safety"
        }
      ]
    };

    return NextResponse.json(mockRecommendations);
  } catch (error) {
    console.error('推荐处理失败:', error);
    return NextResponse.json(
      { error: '推荐处理失败' },
      { status: 500 }
    );
  }
} 