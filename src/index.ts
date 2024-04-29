import { Elysia, } from 'elysia';
import userRoutes from './routes/users';
import logger from './utils/logger';

const app = new Elysia()
  .get('/', () => 'Hello from QAME')
  .use(userRoutes)
  .listen(process.env.APPLICATION_PORT || '3000');

logger.info(`🦊 QAME running at: ${app.server?.url}`);
