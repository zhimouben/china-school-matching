import { z } from 'zod';

export const formSchema = z.object({
  // 基本信息
  gpa: z.string()
    .min(1, '请输入 GPA')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0 && parseFloat(val) <= 4.0, {
      message: 'GPA 必须在 0-4.0 之间'
    }),
  languageScore: z.object({
    type: z.enum(['HSK', '雅思', '托福']).describe('语言成绩类型'),
    score: z.string().optional()
  }).optional(),

  // 留学目标
  targetDegree: z.enum(['本科', '硕士', '博士']).describe('目标学位'),
  intendedMajors: z.array(z.string()).optional(),
  locationPreference: z.array(z.string()).optional(),

  // 经济条件
  budgetRange: z.object({
    min: z.number().min(0, '预算不能为负数'),
    max: z.number().min(0, '预算不能为负数')
  }).refine((data) => data.max >= data.min, {
    message: '最高预算必须大于等于最低预算',
    path: ['max']
  }),
  needScholarship: z.boolean().default(false)
});

export type FormData = z.infer<typeof formSchema>; 