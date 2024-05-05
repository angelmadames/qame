import { Elysia } from 'elysia';
import { browserModel } from './browsers.model';
import { browserService } from './browsers.service';

const browserRoutes = new Elysia({ prefix: '/browsers' })
  .use(browserModel)
  .get('/', () => browserService.getAll())
  .get('/:id', ({ params: { id } }) => browserService.getOneById(id), {
    params: 'id',
  })
  .get('/:id', ({ params: { name } }) => browserService.getOneByName(name), {
    params: 'name',
  })
  .post('/add', async ({ body }) => await browserService.addOne(body), {
    body: 'browser',
  })
  .put(
    '/update/:id',
    ({ params: { id }, body }) => browserService.updateOne(id, body),
    { params: 'id', body: 'browser' },
  )
  .delete('/delete/:id', ({ params: { id } }) => browserService.deleteOne(id), {
    params: 'id',
  });

export default browserRoutes;
