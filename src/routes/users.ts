import { Elysia, t } from 'elysia';
import UserService from '../services/user';
import { IdDTO, UserDTO } from '../database/models';

const userRoutes = new Elysia({ prefix: '/users' })
  .get('/', () => UserService.getAll())
  .get(
    '/:id',
    ({ params: { id } }) => UserService.getOne(id),
    { params: IdDTO, }
  )
  .post(
    '/add', ({ body }) => UserService.addOne(body),
    { body: UserDTO }
  )
  .put(
    '/update/:id',
    ({ params: { id }, body }) => UserService.updateOne(id, body),
    { params: IdDTO, body: UserDTO, },
  );

export default userRoutes;
