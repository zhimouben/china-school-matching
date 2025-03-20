"use client";

import React from 'react';

interface Step {
  id: string;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="relative">
      {/* 进度条 */}
      <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200">
        <div
          className="absolute h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* 步骤点 */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                transition-all duration-300
                ${index <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
                }
              `}
            >
              {index + 1}
            </div>
            <span
              className={`
                mt-2 text-sm font-medium
                ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}
              `}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}; 