import { PrismaClient } from '@prisma/client';
import logger from '../../utils/logger';

export const seedBrowserEngines = async (db: PrismaClient) => {
  const browserEngines = ['WebKit', 'Blink', 'Gecko', 'Goanna'];
  for (const engine of browserEngines) {
    await db.browserEngine.upsert({
      where: { name: engine },
      update: {},
      create: {
        name: engine,
      },
    });
    logger.info(`Added seed browser engine: ${engine}.`);
  }
};
