import { Elysia } from 'elysia';
import DeviceService from '../services/device';
import { deviceModel } from '../database/models/device.model';

const deviceRoutes = new Elysia({ prefix: '/devices' })
  .use(deviceModel)
  .get('/', () => DeviceService.getAll())
  .get('/:id', ({ params: { id } }) => DeviceService.getOne(id), { params: 'id' })
  .post('/add', ({ body }) => DeviceService.addOne(body), { body: 'device' })
  .put(
    '/update/:id',
    ({ params: { id }, body }) => DeviceService.updateOne(id, body),
    { params: 'id', body: 'device' },
  )
  .delete('/delete/:id', ({ params: { id } }) => DeviceService.deleteOne(id), {
    params: 'id',
  });

export default deviceRoutes;
