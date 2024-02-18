/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const categoryData: Prisma.CategoryCreateInput[] = [
  {
    categoryName: 'Construction',
  },
  {
    categoryName: 'Bathroom Accessories',
  },
  { categoryName: 'Piping Accessories' },
];

const customerData: Prisma.CustomerCreateInput[] = [
  {
    address: 'No.1, 19th street',
    name: 'MinThitsar',
    phone: '09-956412388',
  },
  {
    address: 'No.2, 19th street',
    name: 'Daniel',
    phone: '09-9640069874',
  },
  {
    address: 'No.5, 19th street',
    name: 'ZinmarMin',
    phone: '09-4821212',
  },
];

const supplierData: Prisma.SupplierCreateInput[] = [
  {
    address: 'No.1, 25th street',
    name: 'Taw Win',
    phone: '09-956412388',
  },
  {
    address: 'No.2, 81th street',
    name: 'OSCAR Trading',
    phone: '09-9640069874',
  },
  {
    address: 'No.5, 24th street',
    name: 'CMP Co.,Ltd',
    phone: '09-4821212',
  },
];
// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: 'Zinmar',
//     email: 'zinmar@stt.com',
//     password: 'zinmar',
//     refreshPwd: '',
//   },
//   {
//     name: 'Daniel',
//     email: 'daniel@stt.com',
//     password: 'daniel',
//     refreshPwd: '',
//   },
//   {
//     name: 'Riki',
//     email: 'riki@stt.com',
//     password: 'riki',
//     refreshPwd: '',
//   },
// ];

const productData: Prisma.ProductCreateInput[] = [
  {
    id: 'P001',
    brandName: 'CROWN',
    buyPrice: 7500,
    isActive: true,
    productName: 'Cement 4.25 CROWN',
    reorderLvl: 10,
    qtyOnHand: 50,
    sellPriceLevel1: 8300,
    sellPriceLevel2: 8000,
    uom: 'EACH',
    category: {
      connect: { id: 1 },
    },
  },
  {
    id: 'P002',
    brandName: 'MATO',
    buyPrice: 25000,
    isActive: true,
    productName: 'ToiletBowl MATO big',
    reorderLvl: 5,
    qtyOnHand: 50,
    sellPriceLevel1: 31000,
    sellPriceLevel2: 30000,
    uom: 'EACH',
    category: {
      connect: { id: 2 },
    },
  },
  {
    id: 'P003',
    brandName: 'SOGO',
    buyPrice: 18000,
    isActive: true,
    productName: 'PVC 4" Class 8.5 SOGO',
    reorderLvl: 3,
    qtyOnHand: 50,
    sellPriceLevel1: 21000,
    sellPriceLevel2: 20000,
    uom: 'EACH',
    category: { connect: { id: 3 } },
  },
];

async function main() {
  console.log('Start seeding ...');
  for (const c of categoryData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const category = await prisma.category.create({ data: c });
  }
  console.log('Category Data Seeding done..');
  for (const p of productData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const product = await prisma.product.create({ data: p });
  }
  console.log('Product Data seeding done..');

  for (const cu of customerData) {
    const customer = await prisma.customer.create({ data: cu });
  }
  console.log('Customer Data seeding done ...');

  for (const su of supplierData) {
    const supplier = await prisma.supplier.create({ data: su });
  }
  console.log('Supplier Data seeding done ...');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
