import { PrismaClient } from '@prisma/client';
import { sleep } from '../lib/utils';

const prisma = new PrismaClient();

// 示例数据
const EXAMPLE_UNIVERSITIES = [
  {
    name: '清华大学',
    city: '北京',
    ranking: 25,
    description: '清华大学是中国著名的综合性研究型大学，在工程技术、计算机科学等领域享有盛誉。',
    website: 'https://www.tsinghua.edu.cn',
    logo: 'https://www.tsinghua.edu.cn/images/logo.png'
  },
  {
    name: '北京大学',
    city: '北京',
    ranking: 18,
    description: '北京大学是中国最古老的国立综合性大学，在人文社科、基础科学等领域具有优势。',
    website: 'https://www.pku.edu.cn',
    logo: 'https://www.pku.edu.cn/images/logo.png'
  }
];

const EXAMPLE_PROGRAMS = [
  {
    name: '计算机科学与技术',
    university: '清华大学',
    degree: 'Bachelor\'s',
    subject: '计算机科学',
    tuition: {
      amount: 26000,
      currency: 'CNY'
    },
    duration: 4,
    description: '该专业培养具有扎实的计算机科学理论基础和系统的专业知识。',
    requirements: {
      language: {
        HSK: 5,
        IELTS: 6.5,
        TOEFL: 90
      },
      academic: {
        GPA: 3.5
      }
    }
  },
  {
    name: '国际商务',
    university: '北京大学',
    degree: 'Master\'s',
    subject: '商科',
    tuition: {
      amount: 35000,
      currency: 'CNY'
    },
    duration: 2,
    description: '该专业旨在培养具有国际视野的高级商务人才。',
    requirements: {
      language: {
        HSK: 6,
        IELTS: 7.0,
        TOEFL: 100
      },
      academic: {
        GPA: 3.2
      }
    }
  }
];

// 保存数据到数据库
async function saveData() {
  try {
    // 保存大学数据
    for (const uni of EXAMPLE_UNIVERSITIES) {
      const university = await prisma.university.create({
        data: {
          nameZh: uni.name,
          nameEn: uni.name,
          location: uni.city,
          website: uni.website || '',
          logo: uni.logo || '',
          climate: '温带', // 示例数据
          internationalIndex: 0.8, // 示例数据
          qsRank: uni.ranking || 0,
          description: uni.description || ''
        }
      });

      // 保存项目数据
      const uniPrograms = EXAMPLE_PROGRAMS.filter(prog => prog.university === uni.name);
      for (const prog of uniPrograms) {
        await prisma.program.create({
          data: {
            nameZh: prog.name,
            nameEn: prog.name,
            universityId: university.id,
            degreeLevel: prog.degree,
            field: prog.subject,
            tuitionFeeYearly: prog.tuition.amount,
            minGpa: prog.requirements.academic?.GPA || 0,
            minLanguageScore: JSON.stringify(prog.requirements.language),
            duration: prog.duration || 4,
            description: prog.description || ''
          }
        });
      }
    }
  } catch (error) {
    console.error('保存数据失败:', error);
    throw error;
  }
}

// 主函数
export async function main() {
  try {
    console.log('开始保存示例数据...');
    
    // 保存示例数据
    await saveData();
    
    console.log('数据保存完成！');
  } catch (error) {
    console.error('执行失败:', error);
    throw error;
  }
}

// 如果是直接运行脚本
if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
} 