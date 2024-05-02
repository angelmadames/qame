import { PrismaClient } from '@prisma/client';
import logger from '../../utils/logger';

export const seedUsers = async (db: PrismaClient) => {
  const john = await db.user.upsert({
    where: { email: 'john.doe@qame.io' },
    update: {},
    create: {
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@qame.io',
      password: 'agoodpasswordshouldnotbelikethis',
      type: 'user',
      role: 'admin',
      active: true,
    },
  });
  logger.info(`Added seed user: ${john.email}.`);

  const jane = await db.user.upsert({
    where: { email: 'jane.doe@qame.io' },
    update: {},
    create: {
      name: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@qame.io',
      password: 'agoodpasswordshouldnotbelikethis',
      type: 'user',
      role: 'admin',
      active: true,
    },
  });
  logger.info(`Added seed user: ${jane.email}.`);
};
