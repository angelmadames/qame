import { Elysia } from 'elysia';
import deviceRoutes from './modules/devices/devices.routes';
import userRoutes from './modules/users/users.routes';
import logger from './utils/logger';

const app = new Elysia()
  .get('/', () => 'Hello from QAME')
  .use(userRoutes)
  .use(deviceRoutes)
  .listen(process.env.APPLICATION_PORT || '3000');

logger.info(`🦊 QAME running at: ${app.server?.url}`);
