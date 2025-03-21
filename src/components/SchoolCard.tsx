import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export type SchoolType = 'reach' | 'match' | 'safety';

export interface SchoolCardProps {
  name: string;
  ranking: number;
  location: string;
  matchScore: number;
  tuition: number;
  scholarships: string[];
  type: SchoolType;
}

const SchoolCard: React.FC<SchoolCardProps> = ({
  name,
  ranking,
  location,
  matchScore,
  tuition,
  scholarships,
  type
}) => {
  const getTypeColor = () => {
    switch(type) {
      case 'reach':
        return 'text-red-600';
      case 'match':
        return 'text-green-600';
      case 'safety':
        return 'text-blue-600';
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

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <span className={`${getTypeColor()} font-medium`}>
            {getTypeText()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">全国排名</span>
            <span className="font-medium">#{ranking}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">位置</span>
            <span>{location}</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">匹配度</span>
              <span>{matchScore}%</span>
            </div>
            <Progress value={matchScore} className="h-2" />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">学费(年)</span>
            <span>￥{tuition.toLocaleString()}</span>
          </div>

          {scholarships.length > 0 && (
            <div className="space-y-2">
              <span className="text-gray-600">可申请奖学金:</span>
              <div className="flex flex-wrap gap-2">
                {scholarships.map((scholarship, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {scholarship}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolCard; 