import { CronJob } from 'cron';
import { main as crawlUniversities } from './crawler';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 创建定时任务
const job = new CronJob(
  '0 0 1 * *', // 每月1号凌晨执行
  async () => {
    console.log('开始执行定时爬虫任务...');
    try {
      await crawlUniversities();
      console.log('定时爬虫任务执行完成！');
    } catch (error) {
      console.error('定时爬虫任务执行失败:', error);
    }
  },
  null, // 任务完成后的回调
  true, // 立即开始
  'Asia/Shanghai' // 时区
);

// 启动定时任务
job.start();
console.log('定时爬虫任务已启动，将在每月1号凌晨执行');

// 优雅退出
process.on('SIGTERM', async () => {
  console.log('收到 SIGTERM 信号，正在关闭...');
  job.stop();
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('收到 SIGINT 信号，正在关闭...');
  job.stop();
  await prisma.$disconnect();
  process.exit(0);
}); 