import { ChinaAdmissionsCrawler } from './chinaAdmissionsCrawler';
import { Program, Scholarship, LivingCost } from './types';
import fs from 'fs';
import path from 'path';

async function main() {
  const crawler = new ChinaAdmissionsCrawler();
  
  try {
    // 初始化浏览器
    console.log('初始化浏览器...');
    await crawler.init();
    
    // 爬取大学列表
    console.log('开始爬取大学列表...');
    const universities = await crawler.crawlUniversityList();
    console.log(`成功爬取 ${universities.length} 所大学的基本信息`);

    // 保存大学列表数据
    const dataDir = path.join(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(dataDir, 'universities.json'),
      JSON.stringify(universities, null, 2)
    );
    
    // 爬取每所大学的详细信息
    console.log('开始爬取大学详细信息...');
    const allDetails = {
      programs: [] as Program[],
      scholarships: [] as Scholarship[],
      livingCosts: [] as LivingCost[]
    };

    for (const university of universities) {
      console.log(`正在爬取 ${university.name} 的详细信息...`);
      const details = await crawler.crawlUniversityDetails(university);
      allDetails.programs.push(...details.programs);
      allDetails.scholarships.push(...details.scholarships);
      allDetails.livingCosts.push(...details.livingCosts);
    }

    // 保存详细信息数据
    fs.writeFileSync(
      path.join(dataDir, 'programs.json'),
      JSON.stringify(allDetails.programs, null, 2)
    );
    fs.writeFileSync(
      path.join(dataDir, 'scholarships.json'),
      JSON.stringify(allDetails.scholarships, null, 2)
    );
    fs.writeFileSync(
      path.join(dataDir, 'livingCosts.json'),
      JSON.stringify(allDetails.livingCosts, null, 2)
    );

    console.log('爬取完成！数据已保存到 data 目录');
    console.log(`- 共爬取 ${universities.length} 所大学`);
    console.log(`- 共爬取 ${allDetails.programs.length} 个专业`);
    console.log(`- 共爬取 ${allDetails.scholarships.length} 个奖学金项目`);
    console.log(`- 共爬取 ${allDetails.livingCosts.length} 条生活成本信息`);
  } catch (error) {
    console.error('爬虫运行出错:', error);
  } finally {
    // 关闭浏览器
    await crawler.close();
  }
}

// 运行测试
main().catch(console.error); 