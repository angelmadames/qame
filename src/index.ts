import { Elysia, } from 'elysia';
import userRoutes from './routes/users';
import logger from './utils/logger';
import deviceRoutes from './routes/device';

const app = new Elysia()
  .get('/', () => 'Hello from QAME')
  .use(userRoutes)
  .use(deviceRoutes)
  .listen(process.env.APPLICATION_PORT || '3000');

logger.info(`🦊 QAME running at: ${app.server?.url}`);
