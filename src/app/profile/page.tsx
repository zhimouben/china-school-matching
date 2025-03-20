import React from 'react';
import { UserProfileForm } from '@/components/forms/UserProfileForm';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            创建您的留学档案
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            请填写以下信息，我们将为您匹配合适的中国大学
          </p>
        </div>

        <div className="mt-12">
          <UserProfileForm />
        </div>
      </div>
    </div>
  );
} 