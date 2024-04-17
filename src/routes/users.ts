import { Elysia, t } from 'elysia';
import UserService from '../services/user';
import { userModel } from '../database/models';

const userRoutes = new Elysia({ prefix: '/users' })
  .use(userModel)
  .get('/', () => UserService.getAll())
  .get(
    '/:id',
    ({ params: { id } }) => UserService.getOne(id),
    { params: 'id', }
  )
  .post(
    '/add', ({ body }) => UserService.addOne(body),
    { body: 'user' }
  )
  .put(
    '/update/:id',
    ({ params: { id }, body }) => UserService.updateOne(id, body),
    { params: 'id', body: 'user', },
  );

export default userRoutes;
