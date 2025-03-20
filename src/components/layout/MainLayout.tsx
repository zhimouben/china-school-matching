"use client";

import React from 'react';
import Link from 'next/link';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-blue-600">
                  留学中国
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/profile"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  创建档案
                </Link>
                <Link
                  href="/universities"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  大学列表
                </Link>
                <Link
                  href="/scholarships"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  奖学金
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="flex-grow">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                关于我们
              </h3>
              <p className="mt-4 text-base text-gray-500">
                我们致力于帮助国际学生找到最适合的中国大学，实现他们的留学梦想。
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                快速链接
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="/about" className="text-base text-gray-500 hover:text-gray-900">
                    关于我们
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">
                    联系我们
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-base text-gray-500 hover:text-gray-900">
                    常见问题
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                联系方式
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="text-base text-gray-500">
                  邮箱：contact@example.com
                </li>
                <li className="text-base text-gray-500">
                  电话：+86 123 4567 8900
                </li>
                <li className="text-base text-gray-500">
                  地址：北京市朝阳区xxx街道xxx号
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              © {new Date().getFullYear()} 留学中国. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}; 