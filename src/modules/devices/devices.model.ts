import { Elysia, t } from 'elysia';

export const deviceModel = new Elysia()
  .model({
    device: t.Object({
      name: t.String(),
      brand: t.String(),
      model: t.String(),
      active: t.Boolean(),
    }),
  })
  .model({
    id: t.Object({
      id: t.String(),
    }),
  });
