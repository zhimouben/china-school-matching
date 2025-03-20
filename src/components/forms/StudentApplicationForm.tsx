import { useState } from 'react'
import { useForm } from 'react-hook-form'
import BasicInfoForm from './steps/BasicInfoForm'
import AcademicBackgroundForm from './steps/AcademicBackgroundForm'
import StudyGoalsForm from './steps/StudyGoalsForm'
import PreferencesForm from './steps/PreferencesForm'

type FormStep = 'basic' | 'academic' | 'goals' | 'preferences'

export default function StudentApplicationForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>('basic')
  const form = useForm()

  const steps = [
    { id: 'basic', title: '基本信息' },
    { id: 'academic', title: '学术背景' },
    { id: 'goals', title: '留学目标' },
    { id: 'preferences', title: '个人偏好' },
  ]

  const renderStepContent = () => {
    switch (currentStep) {
      case 'basic':
        return <BasicInfoForm form={form} onNext={() => setCurrentStep('academic')} />
      case 'academic':
        return (
          <AcademicBackgroundForm
            form={form}
            onNext={() => setCurrentStep('goals')}
            onBack={() => setCurrentStep('basic')}
          />
        )
      case 'goals':
        return (
          <StudyGoalsForm
            form={form}
            onNext={() => setCurrentStep('preferences')}
            onBack={() => setCurrentStep('academic')}
          />
        )
      case 'preferences':
        return (
          <PreferencesForm
            form={form}
            onSubmit={handleSubmit}
            onBack={() => setCurrentStep('goals')}
          />
        )
    }
  }

  const handleSubmit = async (data: any) => {
    console.log('Form submitted:', data)
    // TODO: 实现表单提交逻辑
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* 步骤指示器 */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${
                index < steps.findIndex((s) => s.id === currentStep)
                  ? 'text-green-500'
                  : index === steps.findIndex((s) => s.id === currentStep)
                  ? 'text-blue-500'
                  : 'text-gray-300'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  index < steps.findIndex((s) => s.id === currentStep)
                    ? 'border-green-500 bg-green-500 text-white'
                    : index === steps.findIndex((s) => s.id === currentStep)
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300'
                }`}
              >
                {index + 1}
              </div>
              <span className="ml-2 text-sm font-medium">{step.title}</span>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 w-12 mx-2 ${
                    index < steps.findIndex((s) => s.id === currentStep)
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 表单内容 */}
      {renderStepContent()}
    </div>
  )
} 