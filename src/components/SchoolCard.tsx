import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export type SchoolType = 'reach' | 'match' | 'safety';

interface Requirements {
  gpa: string;
  language: string;
  other?: string[];
}

export interface ProgramCardProps {
  id: string;
  name: string;
  school: {
    name: string;
    ranking: number;
    location: string;
  };
  degree: 'bachelor' | 'master' | 'phd';
  major: string;
  matchScore: number;
  tuition: number;
  duration: string;
  language: string;
  requirements: Requirements;
  scholarships: string[];
  type: SchoolType;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  id,
  name,
  school,
  degree,
  major,
  matchScore,
  tuition,
  duration,
  language,
  requirements,
  scholarships,
  type
}) => {
  const getTypeColor = () => {
    switch(type) {
      case 'reach':
        return 'bg-red-100 text-red-800';
      case 'match':
        return 'bg-green-100 text-green-800';
      case 'safety':
        return 'bg-blue-100 text-blue-800';
      default:
        return '';
    }
  };

  const getTypeText = () => {
    switch(type) {
      case 'reach':
        return '冲刺';
      case 'match':
        return '匹配';
      case 'safety':
        return '保底';
      default:
        return '';
    }
  };

  const getDegreeText = () => {
    switch(degree) {
      case 'bachelor':
        return '本科';
      case 'master':
        return '硕士';
      case 'phd':
        return '博士';
      default:
        return '';
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* 左侧：基本信息 */}
          <div className="col-span-4 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg">{name}</h3>
                <p className="text-sm text-gray-500">{id}</p>
              </div>
              <Badge className={getTypeColor()}>{getTypeText()}</Badge>
            </div>
            <div className="text-sm">
              <p className="font-medium">{school.name}</p>
              <p className="text-gray-500">#{school.ranking} · {school.location}</p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">匹配度</span>
                <span>{matchScore}%</span>
              </div>
              <Progress value={matchScore} className="h-1.5" />
            </div>
          </div>

          {/* 中间：项目详情 */}
          <div className="col-span-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">学位</span>
              <span>{getDegreeText()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">专业</span>
              <span>{major}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">学费/年</span>
              <span>￥{tuition.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">学制</span>
              <span>{duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">授课语言</span>
              <span>{language}</span>
            </div>
          </div>

          {/* 右侧：要求和奖学金 */}
          <div className="col-span-4 space-y-2 text-sm">
            <div>
              <p className="text-gray-500 mb-1">申请要求</p>
              <ul className="list-disc list-inside space-y-1">
                <li>GPA: {requirements.gpa}</li>
                <li>语言: {requirements.language}</li>
                {requirements.other?.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            {scholarships.length > 0 && (
              <div>
                <p className="text-gray-500 mb-1">可申请奖学金</p>
                <div className="flex flex-wrap gap-1">
                  {scholarships.map((scholarship, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs"
                    >
                      {scholarship}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramCard; 