import logger, { formatLog } from '../utils/logger';

logger.info('Creating database client...')
import db from './client';
logger.info('Database client successfully created and connected.')

async function main() {
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
  })
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
  })
  logger.info(`Added seed user: ${jane.email}.`);
}

await main();

try {
  await db.$disconnect();
  logger.info('Database client disconnected successfully.');
} catch (e) {
  logger.error(formatLog(`Could not disconnect client from database.\n${e}`));
  process.exit(1);
};
