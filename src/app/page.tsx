'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nationality: '',
    age: '',
    email: '',
    phoneCode: '',
    phoneNumber: '',
    currentEducation: '',
    gpa: '',
    languageType: '',
    languageScore: '',
    major: '',
    targetDegree: '',
    targetMajor: '',
    enrollmentYear: '',
    duration: '',
    budget: '',
    location: '',
    scholarship: ''
  });

  const [nationalityOptions, setNationalityOptions] = useState<string[]>([]);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [phoneCodeOptions, setPhoneCodeOptions] = useState<string[]>([]);

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

  const handleLocationSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 这里应该调用API获取城市列表
    // 示例数据
    setLocationOptions(['北京', '上海', '广州', '深圳', '杭州']);
  };

  const handlePhoneCodeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 这里应该调用API获取国际区号列表
    // 示例数据
    setPhoneCodeOptions(['+86', '+1', '+44', '+33', '+49']);
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">手机号码</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        name="phoneCode"
                        value={formData.phoneCode}
                        onChange={handlePhoneCodeSearch}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="区号"
                      />
                      {phoneCodeOptions.length > 0 && (
                        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md">
                          {phoneCodeOptions.map((option) => (
                            <div
                              key={option}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, phoneCode: option }));
                                setPhoneCodeOptions([]);
                              }}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex-2">
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="手机号码"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 学术背景 */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">学术背景</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">当前学历</label>
                  <select
                    name="currentEducation"
                    value={formData.currentEducation}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">请选择</option>
                    <option value="high_school">高中</option>
                    <option value="bachelor">本科</option>
                    <option value="master">硕士</option>
                  </select>
                </div>
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
                  <div className="flex gap-2">
                    <div className="flex-1">
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
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        name="languageScore"
                        value={formData.languageScore}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="分数"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">专业</label>
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
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
                  <label className="block text-sm font-medium text-gray-700">意向专业</label>
                  <input
                    type="text"
                    name="targetMajor"
                    value={formData.targetMajor}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">预期留学时长（年）</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 个人偏好 */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">个人偏好</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">预算范围（美元/年）</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">地理位置偏好</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleLocationSearch}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="请输入城市"
                    />
                    {locationOptions.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md">
                        {locationOptions.map((option) => (
                          <div
                            key={option}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, location: option }));
                              setLocationOptions([]);
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