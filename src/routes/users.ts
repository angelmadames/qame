import { Elysia } from 'elysia';
import UserService from '../services/user';
import { userModel } from '../database/models/user.model';

const userRoutes = new Elysia({ prefix: '/users' })
  .use(userModel)
  .get('/', () => UserService.getAll())
  .get('/:id', ({ params: { id } }) => UserService.getOne(id), { params: 'id' })
  .post('/add', ({ body }) => UserService.addOne(body), { body: 'user' })
  .put(
    '/update/:id',
    ({ params: { id }, body }) => UserService.updateOne(id, body),
    { params: 'id', body: 'user' },
  )
  .delete('/delete/:id', ({ params: { id } }) => UserService.deleteOne(id), {
    params: 'id',
  });

export default userRoutes;
