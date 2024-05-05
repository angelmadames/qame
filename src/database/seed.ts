import logger, { formatLog } from '../utils/logger';
import db from './client';
import { seedBrowserEngines } from './seeders/browser-engines';
import { seedBrowsers } from './seeders/browsers';
import { seedDeviceBrands } from './seeders/device-brands';
import { seedDevices } from './seeders/devices';
import { seedApplicationEnvironments } from './seeders/environments';
import { seedUsers } from './seeders/users';

logger.info('Creating database client...');
await db.$connect();
logger.info('Database client successfully created and connected.');

async function databaseSeeders() {
  await seedBrowserEngines(db);
  await seedBrowsers(db);
  await seedUsers(db);
  await seedDeviceBrands(db);
  await seedDevices(db);
  await seedApplicationEnvironments(db);
}

await databaseSeeders();

try {
  await db.$disconnect();
  logger.info('Database client disconnected successfully.');
} catch (e) {
  logger.error(formatLog(`Could not disconnect client from database.\n${e}`));
  process.exit(1);
}
