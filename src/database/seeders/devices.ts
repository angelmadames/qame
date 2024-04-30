import { PrismaClient } from "@prisma/client";
import logger from "../../utils/logger";

export const seedDevices = async (db: PrismaClient) => {
  const iPhone11 = await db.device.upsert({
    where: { name: 'iPhone 11' },
    update: {},
    create: {
      name: 'iPhone 11',
      brand: 'Apple',
      model: '11',
      active: true,
    },
  })
  logger.info(`Added seed device: ${iPhone11.name}.`);
  const iPhone12 = await db.device.upsert({
    where: { name: 'iPhone 12' },
    update: {},
    create: {
      name: 'iPhone 12',
      brand: 'Apple',
      model: '12',
      active: true,
    },
  })
  logger.info(`Added seed device: ${iPhone12.name}.`);
};
