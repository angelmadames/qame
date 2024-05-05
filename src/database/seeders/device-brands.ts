import { PrismaClient } from '@prisma/client';
import logger from '../../utils/logger';

export const seedDeviceBrands = async (db: PrismaClient) => {
  const deviceBrands = [
    'Apple',
    'Samsung',
    'Google',
    'Sony',
    'Motorola',
    'Xiaomi',
    'LG',
    'OnePlus',
    'Huawei',
    'Asus',
    'Nokia',
    'HTC',
    'ASUS',
    'Alcatel',
    'BlackBerry',
  ];
  for (const brand of deviceBrands) {
    await db.deviceBrand.upsert({
      where: { name: brand },
      update: {},
      create: {
        name: brand,
      },
    });
    logger.info(`Added seed device brand: ${brand}.`);
  }
};
