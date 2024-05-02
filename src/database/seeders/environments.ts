import { PrismaClient } from '@prisma/client';
import logger from '../../utils/logger';

export const seedEnvironments = async (db: PrismaClient) => {
  const stage = await db.environment.upsert({
    where: { name: 'stage' },
    update: {},
    create: {
      name: 'stage',
      active: true,
    },
  });
  logger.info(`Added seed environment: ${stage.name}.`);
  const uat = await db.environment.upsert({
    where: { name: 'uat' },
    update: {},
    create: {
      name: 'uat',
      active: true,
    },
  });
  logger.info(`Added seed environment: ${uat.name}.`);
  const production = await db.environment.upsert({
    where: { name: 'production' },
    update: {},
    create: {
      name: 'production',
      active: true,
    },
  });
  logger.info(`Added seed environment: ${production.name}.`);
};
