'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilterForm from '@/components/FilterForm';
import SchoolCard from '@/components/SchoolCard';
import { getRecommendations, type RecommendationResult } from '@/services/recommendationService';
import { useSearchParams } from 'next/navigation';

export default function RecommendationPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [recommendations, setRecommendations] = useState<RecommendationResult>({
    reach: [],
    match: [],
    safety: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 从 URL 参数中获取用户信息
        const userProfile = {
          nationality: searchParams.get('nationality') || '',
          age: Number(searchParams.get('age')) || 0,
          email: searchParams.get('email') || '',
          gpa: searchParams.get('gpa') || '',
          languageType: (searchParams.get('languageType') || 'hsk') as 'hsk' | 'toefl' | 'ielts',
          languageScore: searchParams.get('languageScore') || '',
          targetDegree: (searchParams.get('targetDegree') || 'bachelor') as 'bachelor' | 'master' | 'phd',
          targetMajor: searchParams.get('targetMajor') || '',
          scholarship: (searchParams.get('scholarship') || 'none') as 'full' | 'partial' | 'none'
        };
        
        const result = await getRecommendations(userProfile);
        setRecommendations(result);
      } catch (err) {
        setError('获取推荐结果失败，请稍后重试');
        console.error('推荐错误:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [searchParams]);

  const handleFilterChange = (filters: any) => {
    // TODO: 根据筛选条件更新推荐结果
    console.log('Filters changed:', filters);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">正在获取推荐结果...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

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
              {[...recommendations.reach, ...recommendations.match, ...recommendations.safety].map((school, index) => (
                <SchoolCard key={`${school.name}-${index}`} {...school} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reach" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {recommendations.reach.map((school, index) => (
                <SchoolCard key={`${school.name}-${index}`} {...school} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="match" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {recommendations.match.map((school, index) => (
                <SchoolCard key={`${school.name}-${index}`} {...school} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="safety" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {recommendations.safety.map((school, index) => (
                <SchoolCard key={`${school.name}-${index}`} {...school} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 