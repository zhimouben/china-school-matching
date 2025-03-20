import React from 'react';

export function PageHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12 mb-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          来华留学学校推荐系统
        </h1>
        <p className="text-xl text-blue-100 text-center max-w-2xl mx-auto">
          智能匹配最适合您的中国高校，助力您的留学梦想
        </p>
      </div>
    </div>
  );
} 