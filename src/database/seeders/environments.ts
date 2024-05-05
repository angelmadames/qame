import { PrismaClient } from '@prisma/client';
import logger from '../../utils/logger';

export const seedApplicationEnvironments = async (db: PrismaClient) => {
  const environments = ['local', 'dev', 'qa', 'stage', 'uat', 'production'];

  for (const environment of environments) {
    await db.applicationEnvironment.upsert({
      where: { name: 'stage' },
      update: {},
      create: {
        name: environment,
      },
    });
    logger.info(`Added seed environment: ${environment}.`);
  }
};
