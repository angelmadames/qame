import { PrismaClient } from '@prisma/client';
import logger from '../../utils/logger';

export const seedBrowsers = async (db: PrismaClient) => {
  const browsers = [
    {
      engine: 'WebKit',
      browsers: ['Safari', 'GNOME Web', 'Konqueror'],
    },
    {
      engine: 'Blink',
      browsers: [
        'Google Chrome',
        'Chromium',
        'Microsoft Edge',
        'Brave',
        'Vivaldi',
        'Opera',
        'Arc',
        'Samsung Internet',
      ],
    },
    {
      engine: 'Gecko',
      browsers: ['Firefox'],
    },
    {
      engine: 'Goanna',
      browsers: ['Pale Moon', 'K-Meleon', 'Basilisk'],
    },
  ];

  for (const browser of browsers) {
    const browserEngineId = await db.browserEngine.findUnique({
      where: { name: browser.engine },
    });

    if (browserEngineId == null) {
      logger.error(
        `Could not find matching engine ${browser.engine} in the database.`,
      );
      process.exit(1);
    }

    for (const name of browser.browsers) {
      await db.browser.upsert({
        where: { name },
        update: {},
        create: {
          name,
          browserEngineId: browserEngineId.id,
        },
      });
      logger.info(`Added seed browser: ${browser.engine} / ${name}.`);
    }
  }
};
