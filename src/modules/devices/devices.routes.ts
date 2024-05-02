import { Elysia } from 'elysia';
import { deviceModel } from './devices.model';
import { deviceService } from './devices.service';

const deviceRoutes = new Elysia({ prefix: '/devices' })
  .use(deviceModel)
  .get('/', () => deviceService.getAll())
  .get('/:id', ({ params: { id } }) => deviceService.getOne(id), {
    params: 'id',
  })
  .post('/add', async ({ body }) => await deviceService.addOne(body), {
    body: 'device',
  })
  .put(
    '/update/:id',
    ({ params: { id }, body }) => deviceService.updateOne(id, body),
    { params: 'id', body: 'device' },
  )
  .delete('/delete/:id', ({ params: { id } }) => deviceService.deleteOne(id), {
    params: 'id',
  });

export default deviceRoutes;
