import { PrismaClient } from '@prisma/client';
import logger from '../../utils/logger';

export const seedBrowsers = async (db: PrismaClient) => {
  const chrome = await db.browser.upsert({
    where: { name: 'Google Chrome' },
    update: {},
    create: {
      name: 'Google Chrome',
      active: true,
    },
  });
  logger.info(`Added seed browser: ${chrome.name}.`);
  const firefox = await db.browser.upsert({
    where: { name: 'Mozilla Firefox' },
    update: {},
    create: {
      name: 'Mozilla Firefox',
      active: true,
    },
  });
  logger.info(`Added seed browser: ${firefox.name}.`);
  const arc = await db.browser.upsert({
    where: { name: 'Arc' },
    update: {},
    create: {
      name: 'Arc',
      active: true,
    },
  });
  logger.info(`Added seed browser: ${arc.name}.`);
};
