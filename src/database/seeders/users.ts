import { PrismaClient } from '@prisma/client';
import logger from '../../utils/logger';

export const seedUsers = async (db: PrismaClient) => {
  const users = [
    {
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@qame.io',
      password: 'agoodpasswordshouldnotbelikethis1',
      type: 'user',
      role: 'admin',
      active: true,
    },
    {
      name: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@qame.io',
      password: 'agoodpasswordshouldnotbelikethis2',
      type: 'user',
      role: 'admin',
      active: true,
    },
  ];

  for (const user of users) {
    await db.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    logger.info(`Added seed user: ${user.email}.`);
  }
};
