import { MainLayout } from '@/components/layout/MainLayout';
import { ApplicationForm } from '@/components/forms/ApplicationForm';

export default function Home() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            找到最适合你的中国大学
          </h2>
          <p className="text-lg text-gray-600">
            通过填写以下信息，我们将为您推荐最匹配的中国高校，助您实现留学梦想
          </p>
        </div>
        <ApplicationForm />
      </div>
    </MainLayout>
  );
} 