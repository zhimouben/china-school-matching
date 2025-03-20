import puppeteer, { Browser, Page } from 'puppeteer';
import { University, Program, Scholarship, LivingCost } from './types';

interface UniversityData {
  name: string;
  location: string;
  website: string;
  description: string;
}

interface ProgramData {
  name: string;
  level: string;
  language: string;
  duration: string;
  tuition: string;
  deadline: string;
}

interface ScholarshipData {
  name: string;
  type: string;
  amount: string;
  requirements: string;
  deadline: string;
}

export class CucasCrawler {
  private browser: Browser | null = null;
  private readonly baseUrl = 'https://www.cucas.cn';

  async init() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: false,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process'
        ],
        defaultViewport: {
          width: 1920,
          height: 1080
        }
      });
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  private async setupPage(page: Page): Promise<void> {
    // 设置用户代理
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
    
    // 设置额外的 HTTP 头
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Connection': 'keep-alive'
    });

    // 启用 JavaScript
    await page.setJavaScriptEnabled(true);
  }

  async crawlUniversityList(): Promise<University[]> {
    if (!this.browser) throw new Error('Browser not initialized');

    const page = await this.browser.newPage();
    await this.setupPage(page);
    const universities: University[] = [];

    try {
      // 访问 CUCAS 大学列表页面
      console.log('正在访问大学列表页面...');
      await page.goto(`${this.baseUrl}/admission/school`, {
        waitUntil: 'networkidle0',
        timeout: 60000
      });

      // 等待页面加载
      console.log('等待页面加载...');
      await page.waitForSelector('body', { timeout: 30000 });

      // 截图用于调试
      await page.screenshot({ path: 'debug-screenshot.png' });
      console.log('已保存页面截图到 debug-screenshot.png');

      // 获取页面 HTML
      const html = await page.content();
      console.log('页面 HTML:', html.substring(0, 200) + '...');

      // 等待大学列表加载
      await page.waitForSelector('.school-list', { timeout: 30000 });

      // 获取大学列表
      const universityData = await page.evaluate(() => {
        const items = document.querySelectorAll('.school-item');
        return Array.from(items).map(item => ({
          name: item.querySelector('.school-name')?.textContent?.trim() || '',
          location: item.querySelector('.school-location')?.textContent?.trim() || '',
          website: (item.querySelector('a.school-link') as HTMLAnchorElement)?.href || '',
          description: item.querySelector('.school-desc')?.textContent?.trim() || ''
        }));
      });

      // 转换为 University 类型
      universities.push(...universityData.map((data: UniversityData) => ({
        id: data.name.toLowerCase().replace(/\s+/g, '-'),
        ...data,
        ranking: 0,
        type: 'comprehensive',
        is985: false,
        is211: false,
        isDoubleFirstClass: false
      })));

      console.log(`成功爬取 ${universities.length} 所大学的基本信息`);
    } catch (error) {
      console.error('爬取大学列表时出错:', error);
    } finally {
      await page.close();
    }

    return universities;
  }

  async crawlUniversityDetails(university: University): Promise<{
    programs: Program[];
    scholarships: Scholarship[];
    livingCosts: LivingCost[];
  }> {
    if (!this.browser) throw new Error('Browser not initialized');

    const page = await this.browser.newPage();
    const result = {
      programs: [] as Program[],
      scholarships: [] as Scholarship[],
      livingCosts: [] as LivingCost[]
    };

    try {
      // 访问大学详情页
      await page.goto(university.website, {
        waitUntil: 'networkidle0'
      });

      // 等待页面加载完成
      await page.waitForSelector('.school-detail', { timeout: 30000 });

      // 爬取专业信息
      await this.crawlPrograms(page, university.id, result.programs);

      // 爬取奖学金信息
      await this.crawlScholarships(page, university.id, result.scholarships);

      // 爬取生活成本信息
      await this.crawlLivingCosts(page, university.id, result.livingCosts);

    } catch (error) {
      console.error(`爬取 ${university.name} 详细信息时出错:`, error);
    } finally {
      await page.close();
    }

    return result;
  }

  private async crawlPrograms(
    page: Page,
    universityId: string,
    programs: Program[]
  ): Promise<void> {
    try {
      // 等待专业列表加载
      await page.waitForSelector('.program-list', { timeout: 30000 });

      const programData = await page.evaluate(() => {
        const items = document.querySelectorAll('.program-item');
        return Array.from(items).map(item => ({
          name: item.querySelector('.program-name')?.textContent?.trim() || '',
          level: item.querySelector('.program-level')?.textContent?.trim() || '',
          language: item.querySelector('.program-language')?.textContent?.trim() || '',
          duration: item.querySelector('.program-duration')?.textContent?.trim() || '',
          tuition: item.querySelector('.program-tuition')?.textContent?.trim() || '',
          deadline: item.querySelector('.program-deadline')?.textContent?.trim() || ''
        }));
      });

      programs.push(...programData.map((data: ProgramData) => ({
        universityId,
        name: data.name,
        level: this.mapProgramLevel(data.level),
        language: data.language,
        duration: data.duration,
        tuition: {
          amount: this.extractAmount(data.tuition),
          currency: 'CNY'
        },
        applicationDeadline: data.deadline,
        requirements: ''
      })));
    } catch (error) {
      console.error('爬取专业信息时出错:', error);
    }
  }

  private async crawlScholarships(
    page: Page,
    universityId: string,
    scholarships: Scholarship[]
  ): Promise<void> {
    try {
      // 等待奖学金列表加载
      await page.waitForSelector('.scholarship-list', { timeout: 30000 });

      const scholarshipData = await page.evaluate(() => {
        const items = document.querySelectorAll('.scholarship-item');
        return Array.from(items).map(item => ({
          name: item.querySelector('.scholarship-name')?.textContent?.trim() || '',
          type: item.querySelector('.scholarship-type')?.textContent?.trim() || '',
          amount: item.querySelector('.scholarship-amount')?.textContent?.trim() || '',
          requirements: item.querySelector('.scholarship-requirements')?.textContent?.trim() || '',
          deadline: item.querySelector('.scholarship-deadline')?.textContent?.trim() || ''
        }));
      });

      scholarships.push(...scholarshipData.map((data: ScholarshipData) => ({
        universityId,
        name: data.name,
        type: data.type,
        minAmount: 0,
        maxAmount: this.extractAmount(data.amount),
        coverage: {
          tuition: data.type.includes('学费'),
          accommodation: data.type.includes('住宿'),
          livingExpenses: data.type.includes('生活')
        },
        requirements: data.requirements,
        applicationDeadline: data.deadline
      })));
    } catch (error) {
      console.error('爬取奖学金信息时出错:', error);
    }
  }

  private async crawlLivingCosts(
    page: Page,
    universityId: string,
    livingCosts: LivingCost[]
  ): Promise<void> {
    try {
      // 等待生活成本信息加载
      await page.waitForSelector('.living-costs', { timeout: 30000 });

      const livingCostData = await page.evaluate(() => {
        const container = document.querySelector('.living-costs');
        return {
          city: container?.querySelector('.city-name')?.textContent?.trim() || '',
          accommodation: {
            onCampus: container?.querySelector('.on-campus-cost')?.textContent?.trim() || '',
            offCampus: container?.querySelector('.off-campus-cost')?.textContent?.trim() || ''
          },
          dailyExpenses: {
            food: container?.querySelector('.food-cost')?.textContent?.trim() || '',
            transportation: container?.querySelector('.transportation-cost')?.textContent?.trim() || '',
            other: container?.querySelector('.other-cost')?.textContent?.trim() || ''
          }
        };
      });

      livingCosts.push({
        universityId,
        ...livingCostData
      });
    } catch (error) {
      console.error('爬取生活成本信息时出错:', error);
    }
  }

  private mapProgramLevel(level: string): 'undergraduate' | 'master' | 'doctoral' {
    if (level.includes('本科')) return 'undergraduate';
    if (level.includes('硕士')) return 'master';
    if (level.includes('博士')) return 'doctoral';
    return 'undergraduate'; // 默认值
  }

  private extractAmount(text: string): number {
    const match = text.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  }
} 