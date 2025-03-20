"use client";

import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">来华留学学校推荐系统</h1>
            <nav className="flex space-x-4">
              <a href="/" className="text-gray-600 hover:text-gray-900">首页</a>
              <a href="/about" className="text-gray-600 hover:text-gray-900">关于</a>
              <select className="text-gray-600 bg-transparent border-none">
                <option value="zh">中文</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
              </select>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">联系我们</h3>
              <p className="text-gray-600">邮箱：contact@studyinchina.com</p>
              <p className="text-gray-600">电话：+86 123 4567 8900</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">快速链接</h3>
              <ul className="space-y-2">
                <li><a href="/faq" className="text-gray-600 hover:text-gray-900">常见问题</a></li>
                <li><a href="/universities" className="text-gray-600 hover:text-gray-900">院校列表</a></li>
                <li><a href="/scholarships" className="text-gray-600 hover:text-gray-900">奖学金信息</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">关注我们</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">微信</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">微博</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            © 2024 来华留学学校推荐系统. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 