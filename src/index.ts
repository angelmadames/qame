import { Elysia, t } from 'elysia';
import userRoutes from './routes/users';

const app = new Elysia()
  .get('/', () => 'Hello from QAME')
  .use(userRoutes)
  .listen(process.env.APPLICATION_PORT || '3000');

console.log(
  `🦊 QAME running at: http://${app.server.hostname}:${app.server.port}`
);
