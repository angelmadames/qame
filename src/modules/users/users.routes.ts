import { Elysia } from 'elysia';
import { userModel } from './users.model';
import { userService } from './users.service';

const userRoutes = new Elysia({ prefix: '/users' })
  .use(userModel)
  .get('/', () => userService.getAll())
  .get('/search', ({ query }) => userService.getOneByEmail(query.email), {
    query: 'user.email',
  })
  .get('/:id', ({ params: { id } }) => userService.getOneById(id), {
    params: 'user.id',
  })
  .post('/add', async ({ body }) => await userService.addOne(body), {
    body: 'user',
  })
  .put(
    '/update/:id',
    ({ params: { id }, body }) => userService.updateOne(id, body),
    { params: 'user.id', body: 'user' },
  )
  .delete('/delete/:id', ({ params: { id } }) => userService.deleteOne(id), {
    params: 'user.id',
  });

export default userRoutes;
