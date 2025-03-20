export type LanguageTest = 'HSK' | 'IELTS' | 'TOEFL';

export interface StudentFormData {
  nationality: string;
  age: number;
  email: string;
  gpa: number;
  targetDegree: 'bachelor' | 'master' | 'phd';
  targetMajor: string;
  needScholarship: 'needed' | 'optional';
  languageTest?: {
    type: LanguageTest;
    score: number;
  };
} 