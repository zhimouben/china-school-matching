import { NextResponse } from 'next/server';
import type { UserProfile, RecommendationResult } from '@/services/recommendationService';

export async function POST(request: Request) {
  try {
    const userProfile: UserProfile = await request.json();

    // 模拟数据
    const mockRecommendations: RecommendationResult = {
      reach: [
        {
          id: "THU-CS-PHD-2024",
          name: "计算机科学与技术博士项目",
          school: {
            name: "清华大学",
            ranking: 1,
            location: "北京"
          },
          degree: "phd",
          major: "计算机科学与技术",
          matchScore: 85,
          tuition: 45000,
          duration: "4年",
          language: "中文/英文",
          requirements: {
            gpa: "3.5/4.0",
            language: "托福100或HSK6级",
            other: ["研究经历", "发表论文"]
          },
          scholarships: ["中国政府奖学金", "清华大学奖学金"],
          type: "reach"
        },
        {
          id: "PKU-AI-PHD-2024",
          name: "人工智能博士项目",
          school: {
            name: "北京大学",
            ranking: 2,
            location: "北京"
          },
          degree: "phd",
          major: "人工智能",
          matchScore: 82,
          tuition: 40000,
          duration: "4年",
          language: "中文/英文",
          requirements: {
            gpa: "3.5/4.0",
            language: "托福95或HSK6级"
          },
          scholarships: ["中国政府奖学金", "北京大学奖学金"],
          type: "reach"
        },
        {
          id: "THU-CS-MS-2024",
          name: "计算机科学与技术硕士项目",
          school: {
            name: "清华大学",
            ranking: 1,
            location: "北京"
          },
          degree: "master",
          major: "计算机科学与技术",
          matchScore: 88,
          tuition: 35000,
          duration: "3年",
          language: "中文",
          requirements: {
            gpa: "3.3/4.0",
            language: "HSK5级"
          },
          scholarships: ["清华大学奖学金"],
          type: "reach"
        }
      ],
      match: [
        {
          id: "ZJU-CS-MS-2024",
          name: "计算机科学与技术硕士项目",
          school: {
            name: "浙江大学",
            ranking: 3,
            location: "杭州"
          },
          degree: "master",
          major: "计算机科学与技术",
          matchScore: 90,
          tuition: 30000,
          duration: "3年",
          language: "中文",
          requirements: {
            gpa: "3.0/4.0",
            language: "HSK5级"
          },
          scholarships: ["浙江大学奖学金"],
          type: "match"
        },
        {
          id: "SJTU-AI-MS-2024",
          name: "人工智能硕士项目",
          school: {
            name: "上海交通大学",
            ranking: 4,
            location: "上海"
          },
          degree: "master",
          major: "人工智能",
          matchScore: 88,
          tuition: 32000,
          duration: "2.5年",
          language: "中文/英文",
          requirements: {
            gpa: "3.0/4.0",
            language: "托福90或HSK5级"
          },
          scholarships: ["上海交大奖学金"],
          type: "match"
        },
        {
          id: "SJTU-SE-MS-2024",
          name: "软件工程硕士项目",
          school: {
            name: "上海交通大学",
            ranking: 4,
            location: "上海"
          },
          degree: "master",
          major: "软件工程",
          matchScore: 92,
          tuition: 30000,
          duration: "2.5年",
          language: "中文",
          requirements: {
            gpa: "3.0/4.0",
            language: "HSK5级"
          },
          scholarships: ["上海交大奖学金"],
          type: "match"
        }
      ],
      safety: [
        {
          id: "NJU-CS-MS-2024",
          name: "计算机科学与技术硕士项目",
          school: {
            name: "南京大学",
            ranking: 5,
            location: "南京"
          },
          degree: "master",
          major: "计算机科学与技术",
          matchScore: 95,
          tuition: 28000,
          duration: "3年",
          language: "中文",
          requirements: {
            gpa: "2.8/4.0",
            language: "HSK4级"
          },
          scholarships: ["南京大学奖学金"],
          type: "safety"
        },
        {
          id: "WHU-SE-MS-2024",
          name: "软件工程硕士项目",
          school: {
            name: "武汉大学",
            ranking: 6,
            location: "武汉"
          },
          degree: "master",
          major: "软件工程",
          matchScore: 92,
          tuition: 25000,
          duration: "3年",
          language: "中文",
          requirements: {
            gpa: "2.8/4.0",
            language: "HSK4级"
          },
          scholarships: ["武汉大学奖学金"],
          type: "safety"
        },
        {
          id: "WHU-AI-MS-2024",
          name: "人工智能硕士项目",
          school: {
            name: "武汉大学",
            ranking: 6,
            location: "武汉"
          },
          degree: "master",
          major: "人工智能",
          matchScore: 94,
          tuition: 26000,
          duration: "3年",
          language: "中文",
          requirements: {
            gpa: "2.8/4.0",
            language: "HSK4级"
          },
          scholarships: ["武汉大学奖学金"],
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