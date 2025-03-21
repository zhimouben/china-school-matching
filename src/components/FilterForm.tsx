import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface FilterFormProps {
  onFilterChange: (filters: any) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onFilterChange }) => {
  return (
    <div className="space-y-6">
      {/* 基本信息 */}
      <div className="space-y-4">
        <h3 className="font-semibold">基本信息</h3>
        
        <div className="space-y-2">
          <Label htmlFor="nationality">国籍</Label>
          <Input id="nationality" placeholder="请输入国籍" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">年龄</Label>
          <Input id="age" type="number" placeholder="请输入年龄" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <Input id="email" type="email" placeholder="请输入邮箱" />
        </div>
      </div>

      {/* 学术背景 */}
      <div className="space-y-4">
        <h3 className="font-semibold">学术背景</h3>
        
        <div className="space-y-2">
          <Label htmlFor="education">当前学历</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择学历" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-school">高中</SelectItem>
              <SelectItem value="bachelor">本科</SelectItem>
              <SelectItem value="master">硕士</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gpa">GPA或成绩等级</Label>
          <Input id="gpa" placeholder="请输入GPA" />
        </div>

        <div className="space-y-2">
          <Label>语言能力</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择语言考试" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hsk">HSK</SelectItem>
              <SelectItem value="ielts">雅思</SelectItem>
              <SelectItem value="toefl">托福</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="请输入分数" type="number" className="mt-2" />
        </div>
      </div>

      {/* 留学目标 */}
      <div className="space-y-4">
        <h3 className="font-semibold">留学目标</h3>
        
        <div className="space-y-2">
          <Label>目标学位</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择目标学位" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bachelor">本科</SelectItem>
              <SelectItem value="master">硕士</SelectItem>
              <SelectItem value="phd">博士</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>计划入学时间</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择入学时间" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025年</SelectItem>
              <SelectItem value="2026">2026年</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 个人偏好 */}
      <div className="space-y-4">
        <h3 className="font-semibold">个人偏好</h3>
        
        <div className="space-y-2">
          <Label>预算范围 (美元/年)</Label>
          <div className="pt-2">
            <Slider
              defaultValue={[0]}
              max={100000}
              step={1000}
              className="w-full"
            />
          </div>
          <div className="text-sm text-gray-500 mt-1">
            最高: $100,000/年
          </div>
        </div>

        <div className="space-y-2">
          <Label>地理位置偏好</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择城市" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beijing">北京</SelectItem>
              <SelectItem value="shanghai">上海</SelectItem>
              <SelectItem value="guangzhou">广州</SelectItem>
              <SelectItem value="shenzhen">深圳</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>奖学金需求</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择奖学金需求" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="required">需要</SelectItem>
              <SelectItem value="optional">可有可无</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterForm; 