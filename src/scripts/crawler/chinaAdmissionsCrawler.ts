import puppeteer, { Browser, Page } from 'puppeteer';
import { University, Program, Scholarship, LivingCost } from './types';

/**
 * 中国留学网站爬虫类
 * 用于爬取中国留学网站上的大学信息、专业信息、奖学金和生活成本数据
 */
export class ChinaAdmissionsCrawler {
  private browser: Browser | null = null;
  private readonly baseUrl = 'https://apply.china-admissions.com';

  /**
   * 随机延迟函数
   * @param min 最小延迟时间（毫秒）
   * @param max 最大延迟时间（毫秒）
   * 用于模拟人类行为，避免被反爬虫机制检测
   */
  private async randomDelay(min: number = 1000, max: number = 3000) {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * 模拟人类行为
   * 包括随机滚动和随机鼠标移动
   * @param page Puppeteer页面对象
   */
  private async simulateHumanBehavior(page: Page) {
    // 随机滚动页面
    await page.evaluate(() => {
      const scrollAmount = Math.floor(Math.random() * window.innerHeight);
      window.scrollBy(0, scrollAmount);
    });
    await this.randomDelay(500, 1500);

    // 随机鼠标移动
    const { width, height } = await page.evaluate(() => ({
      width: window.innerWidth,
      height: window.innerHeight
    }));
    await page.mouse.move(
      Math.floor(Math.random() * width),
      Math.floor(Math.random() * height)
    );
    await this.randomDelay(200, 800);
  }

  /**
   * 初始化浏览器
   * 配置浏览器启动参数，禁用自动化特征
   */
  async init() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: false, // 显示浏览器界面
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process',
          '--disable-site-isolation-trials',
          '--disable-blink-features=AutomationControlled',
          '--window-size=1920,1080'
        ],
        defaultViewport: {
          width: 1920,
          height: 1080
        }
      });
    }
  }

  /**
   * 关闭浏览器
   */
  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  /**
   * 设置页面配置
   * 包括浏览器指纹伪装、请求头设置等
   * @param page Puppeteer页面对象
   */
  private async setupPage(page: Page): Promise<void> {
    // 配置浏览器指纹
    await page.evaluateOnNewDocument(() => {
      // 禁用webdriver特征
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
      // 设置语言偏好
      Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en', 'zh-CN'] });
      // 设置浏览器插件
      Object.defineProperty(navigator, 'plugins', { get: () => [
        { name: 'Chrome PDF Plugin' },
        { name: 'Chrome PDF Viewer' },
        { name: 'Native Client' }
      ]});
      
      // 模拟WebGL特征
      const getParameter = WebGLRenderingContext.prototype.getParameter;
      WebGLRenderingContext.prototype.getParameter = function(parameter) {
        if (parameter === 37445) {
          return 'Intel Inc.';
        }
        if (parameter === 37446) {
          return 'Intel(R) Iris(TM) Graphics 6100';
        }
        return getParameter.apply(this, [parameter]);
      };

      // 模拟Chrome浏览器特征
      Object.defineProperty(window, 'chrome', {
        get: () => ({
          runtime: {},
          app: {},
          loadTimes: () => {},
          csi: () => {},
          webstore: {}
        })
      });
    });

    // 设置User-Agent和请求头
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Connection': 'keep-alive',
      'Cache-Control': 'max-age=0',
      'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept-Encoding': 'gzip, deflate, br',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-User': '?1',
      'Sec-Fetch-Dest': 'document'
    });
  }

  /**
   * 爬取大学列表
   * @returns 大学信息数组
   */
  async crawlUniversityList(): Promise<University[]> {
    if (!this.browser) throw new Error('Browser not initialized');

    const page = await this.browser.newPage();
    await this.setupPage(page);
    const universities: University[] = [];

    try {
      console.log('正在访问大学列表页面...');
      
      // 先访问首页，模拟正常用户行为
      await page.goto(this.baseUrl, {
        waitUntil: 'networkidle0',
        timeout: 60000
      });

      // 模拟人类行为
      await this.simulateHumanBehavior(page);
      await this.randomDelay();

      // 访问大学列表页面
      await page.goto(`${this.baseUrl}/universities/`, {
        waitUntil: 'networkidle0',
        timeout: 60000
      });

      console.log('等待页面加载...');
      await page.waitForSelector('body', { timeout: 30000 });

      // 检查并处理验证码
      const hasCaptcha = await page.evaluate(() => {
        return !!document.querySelector('[class*="captcha"], [class*="verify"]');
      });

      if (hasCaptcha) {
        console.log('检测到验证码，请在浏览器中手动完成验证码...');
        console.log('完成后请在控制台按回车键继续...');
        process.stdin.resume();
        await new Promise(resolve => process.stdin.once('data', resolve));
        process.stdin.pause();
      }

      // 模拟人类行为
      await this.simulateHumanBehavior(page);

      // 等待大学列表加载
      await page.waitForSelector('.school.column', { timeout: 30000 });

      // 获取所有大学链接
      const universityLinks = await page.evaluate(() => {
        const schools = document.querySelectorAll('.school.column');
        return Array.from(schools).map(school => {
          const card = school.querySelector('.card');
          const name = school.textContent?.split('\n')[0]?.trim() || '';
          const abbreviation = school.textContent?.split('\n')[2]?.trim() || '';
          const location = school.textContent?.split('\n')[3]?.trim() || '';
          const link = card?.querySelector('a')?.getAttribute('href') || '';
          
          return {
            name,
            abbreviation,
            location,
            url: link
          };
        });
      });

      console.log(`找到 ${universityLinks.length} 所大学`);

      // 访问每个大学的详情页面
      for (const link of universityLinks) {
        if (!link.url) continue;
        
        try {
          console.log(`正在爬取 ${link.name || '未知大学'} 的信息...`);
          const universityPage = await this.browser.newPage();
          await this.setupPage(universityPage);
          
          await universityPage.goto(`${this.baseUrl}${link.url}`, {
            waitUntil: 'networkidle0',
            timeout: 60000
          });

          // 模拟人类行为
          await this.simulateHumanBehavior(universityPage);

          // 等待页面加载
          await universityPage.waitForSelector('.card-content', { timeout: 30000 });

          // 提取大学信息
          const universityData = await universityPage.evaluate(() => {
            const getTextContent = (selector: string) => document.querySelector(selector)?.textContent?.trim() || '';
            
            return {
              name: getTextContent('h1'),
              location: getTextContent('[class*="location"]'),
              description: getTextContent('[class*="description"]'),
              type: getTextContent('[class*="type"]'),
              ranking: getTextContent('[class*="ranking"]')
            };
          });

          // 构建大学对象
          const university: University = {
            id: link.name.toLowerCase().replace(/\s+/g, '-'),
            name: universityData.name || link.name,
            location: universityData.location || link.location,
            ranking: this.extractRanking(universityData.ranking),
            type: universityData.type || 'comprehensive',
            is985: (universityData.type || '').includes('985'),
            is211: (universityData.type || '').includes('211'),
            isDoubleFirstClass: (universityData.type || '').includes('Double First Class'),
            website: `${this.baseUrl}${link.url}`,
            description: universityData.description || ''
          };

          universities.push(university);
          await universityPage.close();

          // 随机延迟，避免频繁请求
          await this.randomDelay(3000, 8000);
        } catch (error) {
          console.error(`爬取 ${link.name || '未知大学'} 时出错:`, error);
        }
      }

      console.log(`成功爬取 ${universities.length} 所大学的基本信息`);
    } catch (error) {
      console.error('爬取大学列表时出错:', error);
    } finally {
      await page.close();
    }

    return universities;
  }

  /**
   * 爬取大学详细信息
   * 包括专业、奖学金和生活成本信息
   * @param university 大学基本信息
   * @returns 包含专业、奖学金和生活成本信息的对象
   */
  async crawlUniversityDetails(university: University): Promise<{
    programs: Program[];
    scholarships: Scholarship[];
    livingCosts: LivingCost[];
  }> {
    if (!this.browser) throw new Error('Browser not initialized');

    const page = await this.browser.newPage();
    await this.setupPage(page);
    
    const result = {
      programs: [] as Program[],
      scholarships: [] as Scholarship[],
      livingCosts: [] as LivingCost[]
    };

    try {
      await page.goto(university.website, {
        waitUntil: 'networkidle0',
        timeout: 60000
      });

      // 等待页面加载
      await page.waitForSelector('.university-detail', { timeout: 30000 });

      // 爬取专业信息
      try {
        await page.waitForSelector('.program-list', { timeout: 10000 });
        const programs = await page.evaluate(() => {
          const programElements = document.querySelectorAll('.program-item');
          return Array.from(programElements).map(program => ({
            name: program.querySelector('.program-title')?.textContent?.trim() || '',
            level: program.querySelector('.program-degree')?.textContent?.trim() || '',
            language: program.querySelector('.program-language')?.textContent?.trim() || '',
            duration: program.querySelector('.program-duration')?.textContent?.trim() || '',
            tuition: program.querySelector('.program-tuition')?.textContent?.trim() || '',
            deadline: program.querySelector('.program-deadline')?.textContent?.trim() || '',
            requirements: program.querySelector('.program-requirements')?.textContent?.trim() || ''
          }));
        });

        result.programs = programs.map(program => ({
          universityId: university.id,
          name: program.name,
          level: this.mapProgramLevel(program.level),
          language: program.language,
          duration: program.duration,
          tuition: {
            amount: this.extractAmount(program.tuition),
            currency: 'CNY'
          },
          applicationDeadline: program.deadline,
          requirements: program.requirements
        }));
      } catch (error) {
        console.error(`爬取 ${university.name} 的专业信息时出错:`, error);
      }

      // 爬取奖学金信息
      try {
        await page.waitForSelector('.scholarship-list', { timeout: 10000 });
        const scholarships = await page.evaluate(() => {
          const scholarshipElements = document.querySelectorAll('.scholarship-item');
          return Array.from(scholarshipElements).map(scholarship => ({
            name: scholarship.querySelector('.scholarship-title')?.textContent?.trim() || '',
            type: scholarship.querySelector('.scholarship-type')?.textContent?.trim() || '',
            amount: scholarship.querySelector('.scholarship-amount')?.textContent?.trim() || '',
            requirements: scholarship.querySelector('.scholarship-requirements')?.textContent?.trim() || '',
            deadline: scholarship.querySelector('.scholarship-deadline')?.textContent?.trim() || ''
          }));
        });

        result.scholarships = scholarships.map(scholarship => ({
          universityId: university.id,
          name: scholarship.name,
          type: scholarship.type,
          minAmount: 0,
          maxAmount: this.extractAmount(scholarship.amount),
          coverage: {
            tuition: scholarship.type.toLowerCase().includes('tuition'),
            accommodation: scholarship.type.toLowerCase().includes('accommodation'),
            livingExpenses: scholarship.type.toLowerCase().includes('living')
          },
          requirements: scholarship.requirements,
          applicationDeadline: scholarship.deadline
        }));
      } catch (error) {
        console.error(`爬取 ${university.name} 的奖学金信息时出错:`, error);
      }

      // 爬取生活成本信息
      try {
        await page.waitForSelector('.costs-section', { timeout: 10000 });
        const livingCost = await page.evaluate(() => {
          const costSection = document.querySelector('.costs-section');
          return {
            city: costSection?.querySelector('.city-name')?.textContent?.trim() || '',
            accommodation: {
              onCampus: costSection?.querySelector('.on-campus-cost')?.textContent?.trim() || '',
              offCampus: costSection?.querySelector('.off-campus-cost')?.textContent?.trim() || ''
            },
            dailyExpenses: {
              food: costSection?.querySelector('.food-cost')?.textContent?.trim() || '',
              transportation: costSection?.querySelector('.transport-cost')?.textContent?.trim() || '',
              other: costSection?.querySelector('.other-cost')?.textContent?.trim() || ''
            }
          };
        });

        result.livingCosts.push({
          universityId: university.id,
          ...livingCost
        });
      } catch (error) {
        console.error(`爬取 ${university.name} 的生活成本信息时出错:`, error);
      }

    } catch (error) {
      console.error(`爬取 ${university.name} 详细信息时出错:`, error);
    } finally {
      await page.close();
    }

    return result;
  }

  /**
   * 映射专业级别
   * @param level 原始专业级别文本
   * @returns 标准化的专业级别
   */
  private mapProgramLevel(level: string): 'undergraduate' | 'master' | 'doctoral' {
    level = level.toLowerCase();
    if (level.includes('bachelor')) return 'undergraduate';
    if (level.includes('master')) return 'master';
    if (level.includes('phd') || level.includes('doctoral')) return 'doctoral';
    return 'undergraduate';
  }

  /**
   * 从文本中提取金额
   * @param text 包含金额的文本
   * @returns 提取的金额数值
   */
  private extractAmount(text: string): number {
    const match = text.match(/\d+(?:,\d+)*(?:\.\d+)?/);
    return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
  }

  /**
   * 从文本中提取排名
   * @param text 包含排名的文本
   * @returns 提取的排名数值
   */
  private extractRanking(text: string): number {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }
} 