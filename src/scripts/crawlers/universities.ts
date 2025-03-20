import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { sleep, toJsonString } from '../../lib/utils';
import https from 'https';

const prisma = new PrismaClient();

// 创建自定义的 axios 实例
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false // 在开发环境中禁用 SSL 验证
  }),
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
});

// 示例大学数据（作为备用数据源）
const BACKUP_UNIVERSITIES = [
  {
    nameZh: '清华大学',
    nameEn: 'Tsinghua University',
    location: '北京市',
    description: '清华大学是中国著名的综合性研究型大学，在工程技术、计算机科学等领域享有盛誉。',
    qsRank: 25
  },
  {
    nameZh: '北京大学',
    nameEn: 'Peking University',
    location: '北京市',
    description: '北京大学是中国最古老的国立综合性大学，在人文社科、基础科学等领域具有优势。',
    qsRank: 18
  },
  // 添加更多备用数据...
];

// 数据源配置
const DATA_SOURCES = {
  // QS 世界大学排名
  QS: {
    baseUrl: 'https://www.topuniversities.com/universities/country/china',
    selectors: {
      universities: '.uni-link',
      rank: '.rank',
      name: '.uni-name',
      score: '.score'
    }
  },
  // 中国教育部涉外监管网
  MOE: {
    baseUrl: 'http://jsj.moe.gov.cn/n1/12019.shtml',
    selectors: {
      universities: '.university-item',
      name: '.university-name',
      location: '.university-location',
      type: '.university-type'
    }
  },
  // 中国高校国际教育网
  CUCAS: {
    baseUrl: 'https://www.cucas.edu.cn/china_universities',
    selectors: {
      universities: '.university-card',
      name: '.university-title',
      location: '.university-location',
      description: '.university-description'
    }
  }
};

// 获取 QS 排名数据
async function fetchQSRankings() {
  try {
    console.log('正在获取 QS 排名数据...');
    const response = await axiosInstance.get(DATA_SOURCES.QS.baseUrl);
    const $ = cheerio.load(response.data);
    const rankings: Record<string, number> = {};

    $(DATA_SOURCES.QS.selectors.universities).each((index: number, element: cheerio.Element) => {
      const name = $(element).find(DATA_SOURCES.QS.selectors.name).text().trim();
      const rank = parseInt($(element).find(DATA_SOURCES.QS.selectors.rank).text().trim());
      if (name && !isNaN(rank)) {
        rankings[name] = rank;
      }
    });

    return rankings;
  } catch (error) {
    console.error('获取 QS 排名数据失败，使用备用数据:', error);
    return BACKUP_UNIVERSITIES.reduce((acc, uni) => {
      acc[uni.nameEn] = uni.qsRank;
      return acc;
    }, {} as Record<string, number>);
  }
}

// 获取大学基本数据
async function fetchUniversityData() {
  try {
    console.log('正在获取大学基本数据...');
    // 由于网站访问限制，直接使用备用数据
    return BACKUP_UNIVERSITIES;
  } catch (error) {
    console.error('获取大学基本数据失败:', error);
    return BACKUP_UNIVERSITIES;
  }
}

// 获取大学详细信息
async function fetchUniversityDetails(university: { nameZh: string; nameEn: string }) {
  try {
    console.log(`正在获取 ${university.nameZh} 的详细信息...`);
    const url = `https://www.${university.nameEn.toLowerCase().replace(/\s+/g, '')}.edu.cn`;
    
    try {
      const response = await axiosInstance.get(url);
      const $ = cheerio.load(response.data);
      
      return {
        website: url,
        description: $('meta[name="description"]').attr('content') || 
                    $('.about-content').text().trim() || 
                    `${university.nameZh}是中国知名高等院校之一。`,
        internationalIndex: calculateInternationalIndex($)
      };
    } catch (error) {
      console.warn(`无法访问 ${university.nameZh} 的官网，使用默认数据`);
      return {
        website: url,
        description: `${university.nameZh}是中国知名高等院校之一。`,
        internationalIndex: 0.5
      };
    }
  } catch (error) {
    console.error(`获取 ${university.nameZh} 详细信息失败:`, error);
    return null;
  }
}

// 计算国际化指数
function calculateInternationalIndex($: ReturnType<typeof cheerio.load>): number {
  let score = 0;
  
  // 检查是否有英文版网站
  if ($('a[href*="english"]').length > 0 || $('a[href*="en"]').length > 0) score += 0.2;
  
  // 检查是否提供国际学生服务
  if ($('div:contains("International")').length > 0 || $('a:contains("International")').length > 0) score += 0.2;
  
  // 检查是否提供奖学金信息
  if ($('div:contains("Scholarship")').length > 0 || $('a:contains("Scholarship")').length > 0) score += 0.2;
  
  // 检查是否有多语言支持
  if ($('[lang]').length > 1) score += 0.2;
  
  // 检查是否有国际交流项目
  if ($('div:contains("Exchange")').length > 0 || $('a:contains("Exchange")').length > 0) score += 0.2;
  
  return score;
}

// 保存大学数据
async function saveUniversityData(
  university: { nameZh: string; nameEn: string; location: string; description: string },
  qsRanking: number,
  details: { website: string; description: string; internationalIndex: number } | null
) {
  try {
    // 检查是否已存在
    const existingUniversity = await prisma.university.findFirst({
      where: {
        OR: [
          { nameZh: university.nameZh },
          { nameEn: university.nameEn }
        ]
      }
    });

    if (existingUniversity) {
      console.log(`更新大学数据: ${university.nameZh}`);
      await prisma.university.update({
        where: { id: existingUniversity.id },
        data: {
          nameZh: university.nameZh,
          nameEn: university.nameEn,
          location: university.location,
          qsRank: qsRanking,
          climate: getClimateByLocation(university.location),
          internationalIndex: details?.internationalIndex || 0,
          description: details?.description || university.description,
          website: details?.website || '',
          logo: `https://logo.clearbit.com/${details?.website || ''}`
        }
      });
    } else {
      console.log(`创建大学数据: ${university.nameZh}`);
      await prisma.university.create({
        data: {
          nameZh: university.nameZh,
          nameEn: university.nameEn,
          location: university.location,
          qsRank: qsRanking,
          climate: getClimateByLocation(university.location),
          internationalIndex: details?.internationalIndex || 0,
          description: details?.description || university.description,
          website: details?.website || '',
          logo: `https://logo.clearbit.com/${details?.website || ''}`
        }
      });
    }
    console.log(`成功保存大学数据: ${university.nameZh}`);
  } catch (error) {
    console.error(`保存 ${university.nameZh} 数据失败:`, error);
  }
}

// 根据位置获取气候类型
function getClimateByLocation(location: string): string {
  const climateMap: Record<string, string> = {
    '北京': '温带季风气候',
    '上海': '亚热带季风气候',
    '广州': '亚热带季风气候',
    '深圳': '亚热带季风气候',
    '武汉': '亚热带季风气候',
    '成都': '亚热带季风气候',
    '西安': '温带季风气候',
    '南京': '亚热带季风气候',
    '杭州': '亚热带季风气候',
    '重庆': '亚热带季风气候'
  };
  
  for (const [city, climate] of Object.entries(climateMap)) {
    if (location.includes(city)) {
      return climate;
    }
  }
  
  return '未知';
}

// 主函数
export async function crawlUniversities() {
  try {
    // 获取 QS 排名数据
    const qsRankings = await fetchQSRankings();
    await sleep(2000); // 避免请求过于频繁

    // 获取大学基本数据
    const universities = await fetchUniversityData();
    await sleep(2000);

    // 处理每所大学
    for (const university of universities) {
      try {
        // 获取详细信息
        const details = await fetchUniversityDetails(university);
        await sleep(2000);

        // 保存数据
        await saveUniversityData(
          university,
          qsRankings[university.nameEn] || 0,
          details
        );
        
        await sleep(1000);
      } catch (error) {
        console.error(`处理大学 ${university.nameZh} 时出错:`, error);
        continue; // 继续处理下一所大学
      }
    }

    console.log('大学数据爬取完成！');
  } catch (error) {
    console.error('爬虫执行失败:', error);
    throw error;
  }
}

// 如果是直接运行脚本
if (require.main === module) {
  crawlUniversities()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
} 