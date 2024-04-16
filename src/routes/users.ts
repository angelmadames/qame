import { Elysia, t } from 'elysia';
import UserService from '../services/user';

const userRoutes = new Elysia({ prefix: '/users' })
  .get('/', () => UserService.getAll())
  .get('/:id', ({ params: { id } }) => UserService.getOne(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .post('/add', ({ body }) => UserService.addOne(body), {
    body: t.Object({
      name: t.String(),
      lastName: t.String(),
      email: t.String({ format: "email" }),
      password: t.String(),
      type: t.String(),
      role: t.String(),
      active: t.Boolean(),
    })
  });

export default userRoutes;
