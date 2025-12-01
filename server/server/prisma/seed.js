const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await Promise.all([
    prisma.shippingMethod.upsert({
      where: { name: 'Standard Shipping' },
      update: {},
      create: {
        name: 'Standard Shipping',
        description: '5-7 Business Days',
        price: 5.99
      }
    }),
    prisma.shippingMethod.upsert({
      where: { name: 'Express Shipping' },
      update: {},
      create: {
        name: 'Express Shipping',
        description: '2-3 Business Days',
        price: 12.99
      }
    })
  ]);

  console.log('Shipping methods created');
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
