import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const universityCount = await prisma.university.count();
  const programCount = await prisma.program.count();
  console.log('学校总数:', universityCount);
  console.log('专业总数:', programCount);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect()); 