import { Elysia, t } from 'elysia';

export const environmentModel = new Elysia()
  .model({
    environment: t.Object({
      name: t.String(),
      active: t.Boolean(),
    }),
  })
  .model({
    id: t.Object({
      id: t.String(),
    }),
  });
