import { Elysia } from 'elysia';
import { environmentModel } from './environments.model';
import { environmentService } from './environments.service';

const environmentRoutes = new Elysia({ prefix: '/environments' })
  .use(environmentModel)
  .get('/', () => environmentService.getAll())
  .get('/:id', ({ params: { id } }) => environmentService.getOneById(id), {
    params: 'environment.id',
  })
  .post('/add', async ({ body }) => await environmentService.addOne(body), {
    body: 'environment.name',
  })
  .put(
    '/update/:id',
    ({ params: { id }, body }) => environmentService.updateOne(id, body),
    { params: 'environment.id', body: 'environment.name' },
  )
  .delete(
    '/delete/:id',
    ({ params: { id } }) => environmentService.deleteOne(id),
    {
      params: 'environment.id',
    },
  );

export default environmentRoutes;
