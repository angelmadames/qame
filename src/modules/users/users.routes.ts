import { Elysia } from 'elysia';
import { userModel } from './users.model';
import { userService } from './users.service';

const userRoutes = new Elysia({ prefix: '/users' })
  .use(userModel)
  .get('/', () => userService.getAll())
  .get('/:id', ({ params: { id } }) => userService.getOne(id), { params: 'id' })
  .post('/add', async ({ body }) => await userService.addOne(body), {
    body: 'user',
  })
  .put(
    '/update/:id',
    ({ params: { id }, body }) => userService.updateOne(id, body),
    { params: 'id', body: 'user' },
  )
  .delete('/delete/:id', ({ params: { id } }) => userService.deleteOne(id), {
    params: 'id',
  });

export default userRoutes;
