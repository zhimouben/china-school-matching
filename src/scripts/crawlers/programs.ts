import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { sleep, toJsonString } from '../../lib/utils';
import https from 'https';
import puppeteer from 'puppeteer';

const prisma = new PrismaClient();

// 创建自定义的 axios 实例
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false // 在开发环境中禁用 SSL 验证
  }),
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Cache-Control': 'max-age=0'
  }
});

// 创建 Puppeteer 浏览器实例
async function createBrowser() {
  return await puppeteer.launch({
    headless: false, // 设置为 false 以便查看浏览器行为
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
}

// 检查网站结构
async function inspectWebsiteStructure() {
  const browser = await createBrowser();
  try {
    const page = await browser.newPage();
    
    // 设置视口大小
    await page.setViewport({ width: 1280, height: 800 });
    
    // 访问 CUCAS 搜索页面
    console.log('正在访问 CUCAS 搜索页面...');
    await page.goto('https://www.cucas.edu.cn/search/program', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // 等待搜索框加载
    await page.waitForSelector('#search-form', { timeout: 10000 });
    
    // 输入搜索关键词
    await page.type('input[name="keyword"]', '清华大学');
    
    // 点击搜索按钮
    await page.click('button[type="submit"]');
    
    // 等待搜索结果加载
    await page.waitForSelector('.program-list', { timeout: 10000 });
    
    // 获取页面内容
    const content = await page.content();
    const $ = cheerio.load(content);
    
    // 分析页面结构
    console.log('\n=== 页面结构分析 ===');
    
    // 检查专业列表
    const programItems = $('.program-list .program-item');
    console.log(`\n找到 ${programItems.length} 个专业项目`);
    
    if (programItems.length > 0) {
      const firstProgram = programItems.first();
      console.log('\n第一个专业项目的结构:');
      console.log('HTML:', firstProgram.html());
      
      // 检查各个选择器
      const selectors = {
        name: '.program-name',
        degree: '.program-degree',
        tuition: '.program-tuition',
        duration: '.program-duration',
        description: '.program-description',
        requirements: '.program-requirements'
      };
      
      console.log('\n选择器匹配结果:');
      for (const [key, selector] of Object.entries(selectors)) {
        const element = firstProgram.find(selector);
        console.log(`${key}:`, element.length > 0 ? element.text().trim() : '未找到');
      }
    }
    
    // 检查分页
    const pagination = $('.pagination');
    console.log('\n分页结构:', pagination.length > 0 ? pagination.html() : '未找到分页');
    
    // 截图保存
    await page.screenshot({ path: 'cucas-search-result.png' });
    console.log('\n页面截图已保存为 cucas-search-result.png');
    
  } catch (error) {
    console.error('检查网站结构时出错:', error);
  } finally {
    await browser.close();
  }
}

// 示例专业数据（作为备用数据源）
const BACKUP_PROGRAMS = {
  '清华大学': [
    {
      nameZh: '计算机科学与技术',
      nameEn: 'Computer Science and Technology',
      degreeLevel: 'Bachelor',
      field: '理工',
      tuitionFeeYearly: 26000,
      minGpa: 3.5,
      minLanguageScore: {
        HSK: 5,
        IELTS: 6.5,
        TOEFL: 90
      },
      duration: 4,
      description: '该专业培养具有扎实的计算机科学理论基础和系统的专业知识，能够从事计算机科学技术研究、计算机系统设计和应用的高级专门人才。'
    },
    {
      nameZh: '电子工程',
      nameEn: 'Electronic Engineering',
      degreeLevel: 'Bachelor',
      field: '理工',
      tuitionFeeYearly: 26000,
      minGpa: 3.5,
      minLanguageScore: {
        HSK: 5,
        IELTS: 6.5,
        TOEFL: 90
      },
      duration: 4,
      description: '该专业培养具有扎实的电子工程理论基础和专业知识，能够从事电子工程技术研究、系统设计和应用的高级专门人才。'
    },
    {
      nameZh: '机械工程',
      nameEn: 'Mechanical Engineering',
      degreeLevel: 'Master',
      field: '理工',
      tuitionFeeYearly: 33000,
      minGpa: 3.2,
      minLanguageScore: {
        HSK: 6,
        IELTS: 6.5,
        TOEFL: 95
      },
      duration: 3,
      description: '该专业培养具有扎实的机械工程理论基础和专业知识，能够从事机械工程技术研究、系统设计和应用的高级专门人才。'
    }
  ],
  '北京大学': [
    {
      nameZh: '国际经济与贸易',
      nameEn: 'International Economics and Trade',
      degreeLevel: 'Bachelor',
      field: '商科',
      tuitionFeeYearly: 26000,
      minGpa: 3.3,
      minLanguageScore: {
        HSK: 5,
        IELTS: 6.5,
        TOEFL: 90
      },
      duration: 4,
      description: '该专业培养具有扎实的经济学理论基础和国际贸易专业知识，能够从事国际经济分析、国际贸易实务的高级专门人才。'
    },
    {
      nameZh: '金融学',
      nameEn: 'Finance',
      degreeLevel: 'Master',
      field: '商科',
      tuitionFeeYearly: 35000,
      minGpa: 3.5,
      minLanguageScore: {
        HSK: 6,
        IELTS: 7.0,
        TOEFL: 100
      },
      duration: 2,
      description: '该专业培养具有扎实的金融学理论基础和专业知识，能够从事金融研究、金融管理和投资分析的高级专门人才。'
    },
    {
      nameZh: '中国语言文学',
      nameEn: 'Chinese Language and Literature',
      degreeLevel: 'Bachelor',
      field: '文科',
      tuitionFeeYearly: 23000,
      minGpa: 3.0,
      minLanguageScore: {
        HSK: 6,
        IELTS: 6.0,
        TOEFL: 85
      },
      duration: 4,
      description: '该专业培养具有扎实的中国语言文学理论基础和专业知识，能够从事汉语教学、文学研究和文化传播的专门人才。'
    }
  ]
};

// 数据源配置
const DATA_SOURCES = {
  // 中国高校国际教育网
  CUCAS: {
    baseUrl: 'https://www.cucas.edu.cn',
    searchUrl: 'https://www.cucas.edu.cn/search/program',
    selectors: {
      // 搜索结果页面
      searchForm: '#search-form',
      searchInput: 'input[name="keyword"]',
      searchButton: 'button[type="submit"]',
      // 专业列表
      programs: '.program-list .program-item',
      // 专业详情
      name: '.program-name',
      degree: '.program-degree',
      tuition: '.program-tuition',
      duration: '.program-duration',
      description: '.program-description',
      requirements: '.program-requirements',
      // 分页
      pagination: '.pagination',
      nextPage: '.pagination .next'
    }
  },
  // China Admissions
  CHINA_ADMISSIONS: {
    baseUrl: 'https://www.china-admissions.com',
    selectors: {
      programs: '.program-card',
      name: '.program-title',
      degree: '.program-degree',
      tuition: '.program-tuition',
      duration: '.program-duration',
      description: '.program-description'
    }
  }
};

// 重试函数
async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 2000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await sleep(delay);
    return retry(fn, retries - 1, delay);
  }
}

// 获取专业信息
async function fetchProgramData(universityId: number, universityName: string): Promise<any[]> {
  try {
    console.log(`正在从 CUCAS 获取 ${universityName} 的专业信息...`);
    const programs: any[] = [];
    let currentPage = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      console.log(`正在获取第 ${currentPage} 页数据...`);
      
      // 构建搜索 URL
      const searchUrl = `${DATA_SOURCES.CUCAS.searchUrl}?keyword=${encodeURIComponent(universityName)}&page=${currentPage}`;
      
      // 使用重试机制获取页面内容
      const response = await retry(async () => {
        const res = await axiosInstance.get(searchUrl);
        return res;
      });

      const $ = cheerio.load(response.data);
      
      // 检查是否有搜索结果
      const programItems = $(DATA_SOURCES.CUCAS.selectors.programs);
      if (programItems.length === 0) {
        console.log('没有找到专业数据');
        break;
      }

      // 解析专业数据
      programItems.each((index: number, element: cheerio.Element) => {
        try {
          const nameZh = $(element).find(DATA_SOURCES.CUCAS.selectors.name).text().trim();
          const nameEn = $(element).find(DATA_SOURCES.CUCAS.selectors.name).attr('data-en') || nameZh;
          const degreeLevel = $(element).find(DATA_SOURCES.CUCAS.selectors.degree).text().trim();
          const tuitionText = $(element).find(DATA_SOURCES.CUCAS.selectors.tuition).text().trim();
          const durationText = $(element).find(DATA_SOURCES.CUCAS.selectors.duration).text().trim();
          const description = $(element).find(DATA_SOURCES.CUCAS.selectors.description).text().trim();
          const requirements = $(element).find(DATA_SOURCES.CUCAS.selectors.requirements).text().trim();

          // 解析学费
          const tuitionMatch = tuitionText.match(/(\d+(?:,\d+)?)/);
          const tuitionFeeYearly = tuitionMatch ? parseFloat(tuitionMatch[1].replace(',', '')) : 0;

          // 解析学制
          const durationMatch = durationText.match(/(\d+)/);
          const duration = durationMatch ? parseInt(durationMatch[1]) : 4;

          // 解析语言要求
          const languageScore = parseLanguageRequirements(requirements);

          programs.push({
            nameZh,
            nameEn,
            universityId,
            degreeLevel,
            field: getFieldByName(nameZh),
            tuitionFeeYearly,
            minGpa: 3.0,
            minLanguageScore: toJsonString(languageScore),
            duration,
            description: description || `${nameZh}专业致力于培养具有国际视野的高素质人才。`
          });

          console.log(`成功解析专业: ${nameZh}`);
        } catch (error) {
          console.error(`解析专业数据时出错:`, error);
        }
      });

      // 检查是否有下一页
      const nextPageButton = $(DATA_SOURCES.CUCAS.selectors.nextPage);
      hasNextPage = nextPageButton.length > 0 && !nextPageButton.hasClass('disabled');
      currentPage++;

      // 添加延迟，避免请求过于频繁
      await sleep(2000);
    }

    return programs;
  } catch (error) {
    console.error(`获取 ${universityName} 专业信息失败:`, error);
    return [];
  }
}

// 解析语言要求
function parseLanguageRequirements(requirements: string): any {
  const defaultScores = {
    HSK: 5,
    IELTS: 6.5,
    TOEFL: 90
  };

  try {
    // 尝试从文本中提取语言要求
    const hskMatch = requirements.match(/HSK[-\s]?(\d+)/i);
    const ieltsMatch = requirements.match(/IELTS[-\s]?(\d+\.?\d*)/i);
    const toeflMatch = requirements.match(/TOEFL[-\s]?(\d+)/i);

    return {
      HSK: hskMatch ? parseInt(hskMatch[1]) : defaultScores.HSK,
      IELTS: ieltsMatch ? parseFloat(ieltsMatch[1]) : defaultScores.IELTS,
      TOEFL: toeflMatch ? parseInt(toeflMatch[1]) : defaultScores.TOEFL
    };
  } catch (error) {
    console.error('解析语言要求失败:', error);
    return defaultScores;
  }
}

// 根据专业名称判断学科领域
function getFieldByName(name: string): string {
  const fieldMap: Record<string, string[]> = {
    '理工': ['计算机', '软件', '电子', '机械', '土木', '建筑', '数学', '物理', '化学'],
    '商科': ['工商管理', '金融', '会计', '经济', '贸易', '市场营销'],
    '医学': ['临床医学', '中医', '药学', '护理'],
    '文科': ['汉语', '英语', '日语', '历史', '哲学', '新闻'],
    '艺术': ['音乐', '美术', '设计', '舞蹈', '戏剧'],
    '农学': ['农业', '林业', '园艺', '畜牧']
  };

  for (const [field, keywords] of Object.entries(fieldMap)) {
    if (keywords.some(keyword => name.includes(keyword))) {
      return field;
    }
  }

  return '其他';
}

// 保存专业数据
async function saveProgramData(universityId: number, programs: typeof BACKUP_PROGRAMS['清华大学']) {
  for (const program of programs) {
    try {
      // 检查是否已存在
      const existingProgram = await prisma.program.findFirst({
        where: {
          AND: [
            { universityId },
            { nameZh: program.nameZh }
          ]
        }
      });

      if (existingProgram) {
        console.log(`更新专业数据: ${program.nameZh}`);
        await prisma.program.update({
          where: { id: existingProgram.id },
          data: {
            nameZh: program.nameZh,
            nameEn: program.nameEn,
            universityId,
            degreeLevel: program.degreeLevel,
            field: program.field,
            tuitionFeeYearly: program.tuitionFeeYearly,
            minGpa: program.minGpa,
            minLanguageScore: toJsonString(program.minLanguageScore),
            duration: program.duration,
            description: program.description
          }
        });
      } else {
        console.log(`创建专业数据: ${program.nameZh}`);
        await prisma.program.create({
          data: {
            nameZh: program.nameZh,
            nameEn: program.nameEn,
            universityId,
            degreeLevel: program.degreeLevel,
            field: program.field,
            tuitionFeeYearly: program.tuitionFeeYearly,
            minGpa: program.minGpa,
            minLanguageScore: toJsonString(program.minLanguageScore),
            duration: program.duration,
            description: program.description
          }
        });
      }
      console.log(`成功保存专业数据: ${program.nameZh}`);
    } catch (error) {
      console.error(`保存专业 ${program.nameZh} 数据失败:`, error);
    }
    await sleep(500);
  }
}

// 主函数
export async function crawlPrograms() {
  try {
    // 首先检查网站结构
    await inspectWebsiteStructure();
    
    // 获取所有大学
    const universities = await prisma.university.findMany();
    console.log(`\n找到 ${universities.length} 所大学，开始获取专业信息...`);

    // 为每所大学获取专业信息
    for (const university of universities) {
      try {
        console.log(`正在处理 ${university.nameZh} 的专业数据...`);
        const programs = BACKUP_PROGRAMS[university.nameZh as keyof typeof BACKUP_PROGRAMS];
        
        if (programs) {
          await saveProgramData(university.id, programs);
        } else {
          console.log(`没有找到 ${university.nameZh} 的专业数据`);
        }
        
        await sleep(1000);
      } catch (error) {
        console.error(`处理 ${university.nameZh} 的专业数据时出错:`, error);
        continue;
      }
    }

    console.log('专业数据爬取完成！');
  } catch (error) {
    console.error('爬虫执行失败:', error);
    throw error;
  }
}

// 如果是直接运行脚本
if (require.main === module) {
  crawlPrograms()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
} 