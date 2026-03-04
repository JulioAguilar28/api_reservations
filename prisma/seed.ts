import { PrismaClient, RoleName } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding roles...');

  await prisma.role.upsert({
    where: { name: RoleName.ADMIN },
    update: {},
    create: {
      name: RoleName.ADMIN,
    },
  });

  await prisma.role.upsert({
    where: { name: RoleName.CLIENT },
    update: {},
    create: {
      name: RoleName.CLIENT,
    },
  });

  console.log('✅ Roles seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
