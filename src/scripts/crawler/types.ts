export interface University {
  id: string;
  name: string;
  location: string;
  ranking: number;
  type: string;
  is985: boolean;
  is211: boolean;
  isDoubleFirstClass: boolean;
  website: string;
  description: string;
}

export interface Program {
  universityId: string;
  name: string;
  level: 'undergraduate' | 'master' | 'doctoral';
  language: string;
  duration: string;
  tuition: {
    amount: number;
    currency: string;
  };
  applicationDeadline: string;
  requirements: string;
}

export interface Scholarship {
  universityId: string;
  name: string;
  type: string;
  minAmount: number;
  maxAmount: number;
  coverage: {
    tuition: boolean;
    accommodation: boolean;
    livingExpenses: boolean;
  };
  requirements: string;
  applicationDeadline: string;
}

export interface LivingCost {
  universityId: string;
  city: string;
  accommodation: {
    onCampus: string;
    offCampus: string;
  };
  dailyExpenses: {
    food: string;
    transportation: string;
    other: string;
  };
} 