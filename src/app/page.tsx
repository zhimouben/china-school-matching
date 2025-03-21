'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nationality: '',
    age: '',
    email: '',
    gpa: '',
    languageType: '',
    languageScore: '',
    targetDegree: '',
    targetMajor: '',
    enrollmentYear: '',
    scholarship: ''
  });

  const [nationalityOptions, setNationalityOptions] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以添加表单验证逻辑
    // 如果验证通过，跳转到推荐结果页面
    router.push('/recommendation');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNationalitySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 这里应该调用API获取国籍列表
    // 示例数据
    setNationalityOptions(['中国', '美国', '英国', '法国', '德国']);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">填写个人信息</h1>
          <p className="mt-2 text-gray-600">请填写以下信息，我们将为您匹配最适合的学校</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            {/* 基本信息 */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">基本信息</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">国籍</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleNationalitySearch}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="请输入国籍"
                      required
                    />
                    {nationalityOptions.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md">
                        {nationalityOptions.map((option) => (
                          <div
                            key={option}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, nationality: option }));
                              setNationalityOptions([]);
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">年龄</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">邮箱</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 学术背景 */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">学术背景</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">GPA或成绩等级</label>
                  <input
                    type="text"
                    name="gpa"
                    value={formData.gpa}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">语言能力</label>
                  <div className="space-y-2">
                    <select
                      name="languageType"
                      value={formData.languageType}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">请选择</option>
                      <option value="hsk">HSK</option>
                      <option value="ielts">雅思</option>
                      <option value="toefl">托福</option>
                    </select>
                    {formData.languageType && (
                      <input
                        type="number"
                        name="languageScore"
                        value={formData.languageScore}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="分数"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">目标专业</label>
                  <input
                    type="text"
                    name="targetMajor"
                    value={formData.targetMajor}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 留学目标 */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">留学目标</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">目标学位</label>
                  <select
                    name="targetDegree"
                    value={formData.targetDegree}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">请选择</option>
                    <option value="high_school">高中</option>
                    <option value="bachelor">本科</option>
                    <option value="master">硕士</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">计划入学时间</label>
                  <select
                    name="enrollmentYear"
                    value={formData.enrollmentYear}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">请选择</option>
                    <option value="2025">2025年</option>
                    <option value="2026">2026年</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 预算 */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">预算</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">奖学金需求</label>
                  <select
                    name="scholarship"
                    value={formData.scholarship}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">请选择</option>
                    <option value="required">需要</option>
                    <option value="optional">可有可无</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              确定
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 