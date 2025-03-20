import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 清空现有数据
  await prisma.program.deleteMany();
  await prisma.university.deleteMany();

  // 创建大学数据
  const universities = [
    {
      nameZh: '清华大学',
      nameEn: 'Tsinghua University',
      qsRank: 25,
      location: '北京',
      climate: '温带',
      internationalIndex: 0.85,
      programs: [
        {
          nameZh: '计算机科学与技术',
          nameEn: 'Computer Science and Technology',
          degreeLevel: '本科',
          field: '理工',
          tuitionFeeYearly: 30000,
          minGpa: 3.5,
          minLanguageScore: { HSK: 5, 雅思: 6.5, 托福: 90 }
        },
        {
          nameZh: '工商管理',
          nameEn: 'Business Administration',
          degreeLevel: '硕士',
          field: '商科',
          tuitionFeeYearly: 35000,
          minGpa: 3.3,
          minLanguageScore: { HSK: 5, 雅思: 6.5, 托福: 90 }
        }
      ]
    },
    {
      nameZh: '北京大学',
      nameEn: 'Peking University',
      qsRank: 18,
      location: '北京',
      climate: '温带',
      internationalIndex: 0.82,
      programs: [
        {
          nameZh: '金融学',
          nameEn: 'Finance',
          degreeLevel: '本科',
          field: '商科',
          tuitionFeeYearly: 28000,
          minGpa: 3.4,
          minLanguageScore: { HSK: 5, 雅思: 6.5, 托福: 90 }
        },
        {
          nameZh: '法学',
          nameEn: 'Law',
          degreeLevel: '硕士',
          field: '法学',
          tuitionFeeYearly: 32000,
          minGpa: 3.3,
          minLanguageScore: { HSK: 5, 雅思: 6.5, 托福: 90 }
        }
      ]
    },
    {
      nameZh: '浙江大学',
      nameEn: 'Zhejiang University',
      qsRank: 45,
      location: '杭州',
      climate: '亚热带',
      internationalIndex: 0.78,
      programs: [
        {
          nameZh: '电子信息工程',
          nameEn: 'Electronic Information Engineering',
          degreeLevel: '本科',
          field: '理工',
          tuitionFeeYearly: 25000,
          minGpa: 3.2,
          minLanguageScore: { HSK: 4, 雅思: 6.0, 托福: 85 }
        },
        {
          nameZh: '机械工程',
          nameEn: 'Mechanical Engineering',
          degreeLevel: '硕士',
          field: '理工',
          tuitionFeeYearly: 28000,
          minGpa: 3.2,
          minLanguageScore: { HSK: 4, 雅思: 6.0, 托福: 85 }
        }
      ]
    },
    {
      nameZh: '复旦大学',
      nameEn: 'Fudan University',
      qsRank: 31,
      location: '上海',
      climate: '亚热带',
      internationalIndex: 0.80,
      programs: [
        {
          nameZh: '医学',
          nameEn: 'Medicine',
          degreeLevel: '本科',
          field: '医学',
          tuitionFeeYearly: 40000,
          minGpa: 3.6,
          minLanguageScore: { HSK: 5, 雅思: 6.5, 托福: 90 }
        },
        {
          nameZh: '建筑学',
          nameEn: 'Architecture',
          degreeLevel: '硕士',
          field: '建筑',
          tuitionFeeYearly: 35000,
          minGpa: 3.3,
          minLanguageScore: { HSK: 5, 雅思: 6.5, 托福: 90 }
        }
      ]
    }
  ];

  // 插入数据
  for (const university of universities) {
    const { programs, ...universityData } = university;
    const createdUniversity = await prisma.university.create({
      data: universityData
    });

    for (const program of programs) {
      await prisma.program.create({
        data: {
          ...program,
          universityId: createdUniversity.id
        }
      });
    }
  }

  console.log('数据填充完成！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 