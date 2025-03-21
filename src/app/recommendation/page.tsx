'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilterForm from '@/components/FilterForm';
import SchoolCard, { SchoolType } from '@/components/SchoolCard';

interface School {
  name: string;
  ranking: number;
  location: string;
  matchScore: number;
  tuition: number;
  scholarships: string[];
  type: SchoolType;
}

// 模拟数据
const mockSchools: Record<SchoolType, School[]> = {
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

export default function RecommendationPage() {
  const [activeTab, setActiveTab] = useState('all');

  const handleFilterChange = (filters: any) => {
    // TODO: 根据筛选条件更新推荐结果
    console.log('Filters changed:', filters);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 左侧筛选面板 */}
      <div className="w-1/4 border-r bg-white p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">筛选条件</h2>
        <FilterForm onFilterChange={handleFilterChange} />
      </div>

      {/* 右侧推荐结果 */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold">推荐结果</h2>
          <p className="text-gray-600 mt-2">根据您的条件，为您推荐以下学校</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="reach">冲刺</TabsTrigger>
            <TabsTrigger value="match">匹配</TabsTrigger>
            <TabsTrigger value="safety">保底</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {[...mockSchools.reach, ...mockSchools.match, ...mockSchools.safety].map((school, index) => (
                <SchoolCard key={index} {...school} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reach" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {mockSchools.reach.map((school, index) => (
                <SchoolCard key={index} {...school} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="match" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {mockSchools.match.map((school, index) => (
                <SchoolCard key={index} {...school} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="safety" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {mockSchools.safety.map((school, index) => (
                <SchoolCard key={index} {...school} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 