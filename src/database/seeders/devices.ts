import { PrismaClient } from '@prisma/client';
import logger from '../../utils/logger';

export const seedDevices = async (db: PrismaClient) => {
  const devices = [
    {
      brand: 'Apple',
      details: {
        name: 'iPhone 11',
        model: '11',
      },
    },
    {
      brand: 'Apple',
      details: {
        name: 'iPhone 12',
        model: '12',
      },
    },
    {
      brand: 'Apple',
      details: {
        name: 'iPhone 13',
        model: '13',
      },
    },
    {
      brand: 'Apple',
      details: {
        name: 'iPhone 14',
        model: '14',
      },
    },
    {
      brand: 'Apple',
      details: {
        name: 'iPhone 15',
        model: '15',
      },
    },
  ];

  for (const device of devices) {
    const brand = await db.deviceBrand.findUnique({
      where: { name: device.brand },
    });

    if (brand == null) {
      logger.error(
        `Could not find matching brand ${device.brand} in the database.`,
      );
      process.exit(1);
    }

    await db.device.upsert({
      where: { name: device.details.name },
      update: {},
      create: {
        ...device.details,
        deviceBrandId: brand.id,
      },
    });
    logger.info(`Added seed device: ${device.details.name}.`);
  }
};
