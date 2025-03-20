import { CucasCrawler } from './cucasCrawler';

async function main() {
  const crawler = new CucasCrawler();
  
  try {
    // 初始化浏览器
    console.log('初始化浏览器...');
    await crawler.init();
    
    // 爬取大学列表
    console.log('开始爬取大学列表...');
    const universities = await crawler.crawlUniversityList();
    console.log(`成功爬取 ${universities.length} 所大学的基本信息`);
    
    // 爬取第一所大学的详细信息作为测试
    if (universities.length > 0) {
      console.log(`开始爬取 ${universities[0].name} 的详细信息...`);
      const details = await crawler.crawlUniversityDetails(universities[0]);
      
      console.log('专业信息:', details.programs.length);
      console.log('奖学金信息:', details.scholarships.length);
      console.log('生活成本信息:', details.livingCosts.length);
    }
  } catch (error) {
    console.error('爬虫运行出错:', error);
  } finally {
    // 关闭浏览器
    await crawler.close();
  }
}

// 运行测试
main().catch(console.error); 