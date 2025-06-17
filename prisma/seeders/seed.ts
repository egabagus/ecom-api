import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  var hashedPassword = await bcrypt.hash('password', 10)
  var now = new Date()

  const result = await prisma.user.createMany({
    data: [
      {
        name: 'Super Admin',
        email: 'superadmin@test.com',
        password: hashedPassword,
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
        deleted_at: null,
      },
      {
        name: 'Admin',
        email: 'admin@test.com',
        password: hashedPassword,
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
        deleted_at: null,
      },
    ],
  });

  console.log(`✅ Created ${result.count} users`);
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('👋 Disconnected from database');
  });
