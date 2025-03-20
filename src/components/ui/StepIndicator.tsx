"use client";

import React from 'react';

interface Step {
  title: string;
  description: string;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.title} className="relative flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm border-2 ${
                index + 1 <= currentStep
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-400 border-gray-300'
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`absolute top-5 w-full h-0.5 -right-1/2 ${
                  index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            )}
            <div className="mt-3 text-center">
              <div
                className={`text-sm font-medium ${
                  index + 1 <= currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {step.title}
              </div>
              <div className="text-xs text-gray-500 mt-1">{step.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 