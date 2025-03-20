import puppeteer from 'puppeteer';
import { University, Program, Scholarship, LivingCost } from './types';

export class UniversityCrawler {
  private browser: puppeteer.Browser | null = null;

  async init() {
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  async crawlUniversityList(): Promise<University[]> {
    if (!this.browser) {
      throw new Error('Browser not initialized');
    }

    const page = await this.browser.newPage();
    const universities: University[] = [];

    try {
      // 访问教育部网站
      await page.goto('http://www.moe.gov.cn/jyb_xxgk/s5743/s5744/', {
        waitUntil: 'networkidle0'
      });

      // 获取大学列表
      const universityData = await page.evaluate(() => {
        // 这里需要根据实际网页结构编写选择器
        const items = document.querySelectorAll('.university-item');
        return Array.from(items).map(item => ({
          name: item.querySelector('.name')?.textContent || '',
          location: {
            city: item.querySelector('.city')?.textContent || '',
            province: item.querySelector('.province')?.textContent || ''
          },
          type: item.querySelector('.type')?.textContent || '',
          is985: item.querySelector('.is985')?.textContent === 'true',
          is211: item.querySelector('.is211')?.textContent === 'true',
          isDoubleFirstClass: item.querySelector('.isDoubleFirstClass')?.textContent === 'true',
          website: item.querySelector('.website')?.getAttribute('href') || '',
          description: item.querySelector('.description')?.textContent || ''
        }));
      });

      universities.push(...universityData);
    } catch (error) {
      console.error('Error crawling university list:', error);
    } finally {
      await page.close();
    }

    return universities;
  }

  async crawlUniversityDetails(university: University): Promise<{
    programs: Program[];
    scholarships: Scholarship[];
    livingCost: LivingCost;
  }> {
    if (!this.browser) {
      throw new Error('Browser not initialized');
    }

    const page = await this.browser.newPage();
    const result = {
      programs: [] as Program[],
      scholarships: [] as Scholarship[],
      livingCost: {} as LivingCost
    };

    try {
      // 访问大学官网
      await page.goto(university.website, {
        waitUntil: 'networkidle0'
      });

      // 爬取专业信息
      const programs = await page.evaluate(() => {
        // 这里需要根据实际网页结构编写选择器
        const items = document.querySelectorAll('.program-item');
        return Array.from(items).map(item => ({
          name: item.querySelector('.name')?.textContent || '',
          level: item.querySelector('.level')?.textContent as '本科' | '硕士' | '博士',
          language: item.querySelector('.language')?.textContent as '中文' | '英文',
          duration: parseInt(item.querySelector('.duration')?.textContent || '0'),
          tuition: {
            amount: parseFloat(item.querySelector('.tuition')?.textContent || '0'),
            currency: 'CNY'
          },
          applicationDeadline: item.querySelector('.deadline')?.textContent || '',
          requirements: {
            language: {
              hsk: parseInt(item.querySelector('.hsk')?.textContent || '0'),
              ielts: parseFloat(item.querySelector('.ielts')?.textContent || '0'),
              toefl: parseInt(item.querySelector('.toefl')?.textContent || '0')
            },
            gpa: parseFloat(item.querySelector('.gpa')?.textContent || '0')
          }
        }));
      });

      // 爬取奖学金信息
      const scholarships = await page.evaluate(() => {
        // 这里需要根据实际网页结构编写选择器
        const items = document.querySelectorAll('.scholarship-item');
        return Array.from(items).map(item => ({
          name: item.querySelector('.name')?.textContent || '',
          type: item.querySelector('.type')?.textContent || '',
          amount: {
            min: parseFloat(item.querySelector('.min-amount')?.textContent || '0'),
            max: parseFloat(item.querySelector('.max-amount')?.textContent || '0'),
            currency: 'CNY'
          },
          coverage: (item.querySelector('.coverage')?.textContent || '').split(','),
          requirements: (item.querySelector('.requirements')?.textContent || '').split('\n'),
          applicationDeadline: item.querySelector('.deadline')?.textContent || ''
        }));
      });

      // 爬取生活成本信息
      const livingCost = await page.evaluate(() => {
        // 这里需要根据实际网页结构编写选择器
        const item = document.querySelector('.living-cost');
        return {
          city: item?.querySelector('.city')?.textContent || '',
          accommodation: {
            onCampus: {
              min: parseFloat(item?.querySelector('.on-campus-min')?.textContent || '0'),
              max: parseFloat(item?.querySelector('.on-campus-max')?.textContent || '0'),
              currency: 'CNY'
            },
            offCampus: {
              min: parseFloat(item?.querySelector('.off-campus-min')?.textContent || '0'),
              max: parseFloat(item?.querySelector('.off-campus-max')?.textContent || '0'),
              currency: 'CNY'
            }
          },
          dailyExpenses: {
            food: parseFloat(item?.querySelector('.food-cost')?.textContent || '0'),
            transportation: parseFloat(item?.querySelector('.transport-cost')?.textContent || '0'),
            other: parseFloat(item?.querySelector('.other-cost')?.textContent || '0'),
            currency: 'CNY'
          }
        };
      });

      result.programs = programs;
      result.scholarships = scholarships;
      result.livingCost = livingCost;
    } catch (error) {
      console.error(`Error crawling details for ${university.name}:`, error);
    } finally {
      await page.close();
    }

    return result;
  }
} 