import logger, { formatLog } from '../utils/logger';
import db from './client';
import { seedBrowsers } from './seeders/browsers';
import { seedDevices } from './seeders/devices';
import { seedEnvironments } from './seeders/environments';
import { seedUsers } from './seeders/users';

logger.info('Creating database client...');
await db.$connect();
logger.info('Database client successfully created and connected.');

async function databaseSeeders() {
  await seedUsers(db);
  await seedDevices(db);
  await seedBrowsers(db);
  await seedEnvironments(db);
}

await databaseSeeders();

try {
  await db.$disconnect();
  logger.info('Database client disconnected successfully.');
} catch (e) {
  logger.error(formatLog(`Could not disconnect client from database.\n${e}`));
  process.exit(1);
}
