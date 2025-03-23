'use client';

import { useState } from 'react';
import { Form, Input, Select, Button, Card, Radio, Space, InputNumber, Divider } from 'antd';
import { useRouter } from 'next/navigation';
import { countries } from '@/data/countries';
import type { SelectProps } from 'antd';

const UserProfileForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [languageType, setLanguageType] = useState<string>('');
  const [showLanguageScore, setShowLanguageScore] = useState(false);

  const handleLanguageTypeChange = (value: string) => {
    setLanguageType(value);
    setShowLanguageScore(value !== 'none');
  };

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    router.push('/recommendation');
  };

  const filterOption: SelectProps['filterOption'] = (input: string, option) =>
    String(option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">留学中国学校匹配系统</h1>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 基本信息 */}
              <Form.Item
                label="国籍"
                name="nationality"
                rules={[{ required: true, message: '请选择您的国籍' }]}
              >
                <Select
                  showSearch
                  placeholder="请选择国籍"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={countries.map(country => ({
                    value: country.code,
                    label: `${country.nameZh} (${country.name})`
                  }))}
                />
              </Form.Item>
              <Form.Item
                label="年龄"
                name="age"
                rules={[{ required: true, message: '请输入您的年龄' }]}
              >
                <InputNumber min={1} max={100} className="w-full" />
              </Form.Item>
              <Form.Item
                label="邮箱"
                name="email"
                rules={[
                  { required: true, message: '请输入您的邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="GPA/成绩等级"
                name="gpa"
                rules={[{ required: true, message: '请输入您的GPA或成绩等级' }]}
              >
                <Input placeholder="例如：3.5/4.0 或 A-" />
              </Form.Item>
              <Form.Item
                label="目标学位"
                name="targetDegree"
                rules={[{ required: true, message: '请输入目标学位' }]}
              >
                <Input placeholder="例如：本科、硕士、博士" />
              </Form.Item>
              <Form.Item
                label="目标专业"
                name="targetMajor"
                rules={[{ required: true, message: '请选择目标专业' }]}
              >
                <Select
                  placeholder="请选择目标专业"
                  options={[
                    { value: 'computer_science', label: '计算机科学与技术' },
                    { value: 'business', label: '工商管理' },
                    { value: 'engineering', label: '工程学' },
                    { value: 'medicine', label: '医学' },
                    { value: 'arts', label: '艺术' },
                    { value: 'other', label: '其他' }
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="奖学金需求"
                name="scholarship"
                rules={[{ required: true, message: '请选择奖学金需求' }]}
              >
                <Select
                  placeholder="请选择奖学金需求"
                  options={[
                    { value: 'full', label: '全额奖学金' },
                    { value: 'partial', label: '部分奖学金' },
                    { value: 'none', label: '不需要奖学金' }
                  ]}
                />
              </Form.Item>
            </div>

            <Form.Item
              label="语言水平"
              name="languageType"
              rules={[{ required: true, message: '请选择语言类型' }]}
            >
              <Radio.Group onChange={(e) => handleLanguageTypeChange(e.target.value)}>
                <Space>
                  <Radio value="hsk">HSK</Radio>
                  <Radio value="ielts">雅思</Radio>
                  <Radio value="toefl">托福</Radio>
                  <Radio value="none">暂无语言成绩</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            {showLanguageScore && (
              <Form.Item
                label="语言成绩"
                name="languageScore"
                rules={[{ required: true, message: '请输入语言成绩' }]}
              >
                <Input placeholder={languageType === 'hsk' ? 'HSK等级' : '分数'} />
              </Form.Item>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                开始匹配
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default UserProfileForm; 