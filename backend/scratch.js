const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function fix() {
  console.log('fixing...');
  const hash = await bcrypt.hash('admin123', 10);
  await prisma.user.update({
    where: { email: 'admin@linguaread.com' },
    data: { passwordHash: hash }
  });
  console.log('Admin password updated!');
}

fix().catch(console.error).finally(() => prisma.$disconnect());
