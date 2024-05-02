import { Elysia } from 'elysia';
import { environmentModel } from './environments.model';
import { environmentService } from './environments.service';

const environmentRoutes = new Elysia({ prefix: '/environments' })
  .use(environmentModel)
  .get('/', () => environmentService.getAll())
  .get('/:id', ({ params: { id } }) => environmentService.getOne(id), {
    params: 'id',
  })
  .post('/add', async ({ body }) => await environmentService.addOne(body), {
    body: 'environment',
  })
  .put(
    '/update/:id',
    ({ params: { id }, body }) => environmentService.updateOne(id, body),
    { params: 'id', body: 'environment' },
  )
  .delete(
    '/delete/:id',
    ({ params: { id } }) => environmentService.deleteOne(id),
    {
      params: 'id',
    },
  );

export default environmentRoutes;
