import { Elysia } from 'elysia';
import browserRoutes from './modules/browsers/browsers.routes';
import deviceRoutes from './modules/devices/devices.routes';
import environmentRoutes from './modules/environments/environments.routes';
import userRoutes from './modules/users/users.routes';
import logger from './utils/logger';

const app = new Elysia()
  .get('/', () => 'Hello from QAME')
  .use(userRoutes)
  .use(deviceRoutes)
  .use(browserRoutes)
  .use(environmentRoutes)
  .listen(process.env.APPLICATION_PORT || '3000');

logger.info(`🦊 QAME running at: ${app.server?.url}`);
