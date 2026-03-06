import { PrismaClient, RoleName } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding roles...');

  const adminRole = await prisma.role.upsert({
    where: { name: RoleName.ADMIN },
    update: {},
    create: {
      name: RoleName.ADMIN,
    },
  });

  const clientRole = await prisma.role.upsert({
    where: { name: RoleName.CLIENT },
    update: {},
    create: {
      name: RoleName.CLIENT,
    },
  });

  console.log('✅ Roles seeded successfully');
  console.log('🌱 Seeding users...');

  const hashedPassword = await bcrypt.hash('Password123', 10);

  const users = [
    {
      fullName: 'Juan Admin',
      email: 'juan.admin@example.com',
      phone: '5511111111',
      roleId: adminRole.id,
    },
    {
      fullName: 'Maria Admin',
      email: 'maria.admin@example.com',
      phone: '5522222222',
      roleId: adminRole.id,
    },
    {
      fullName: 'Carlos Cliente',
      email: 'carlos.cliente@example.com',
      phone: '5533333333',
      roleId: clientRole.id,
    },
    {
      fullName: 'Ana Cliente',
      email: 'ana.cliente@example.com',
      phone: '5544444444',
      roleId: clientRole.id,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  console.log('✅ Users seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
