import { UniversityCrawler } from './universityCrawler';
import { University } from './types';

async function main() {
  const crawler = new UniversityCrawler();
  
  try {
    // 初始化浏览器
    await crawler.init();
    
    // 爬取大学列表
    console.log('开始爬取大学列表...');
    const universities = await crawler.crawlUniversityList();
    console.log(`成功爬取 ${universities.length} 所大学的基本信息`);
    
    // 爬取每所大学的详细信息
    for (const university of universities) {
      console.log(`开始爬取 ${university.name} 的详细信息...`);
      const details = await crawler.crawlUniversityDetails(university);
      
      // TODO: 将数据保存到数据库
      console.log(`成功爬取 ${university.name} 的详细信息`);
    }
  } catch (error) {
    console.error('爬虫运行出错:', error);
  } finally {
    // 关闭浏览器
    await crawler.close();
  }
}

// 运行爬虫
main().catch(console.error); 