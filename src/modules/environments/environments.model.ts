import { Elysia, t } from 'elysia';

export const environmentModel = new Elysia()
  .model({
    environment: t.Object({
      name: t.String(),
    }),
  })
  .model({
    id: t.Object({
      id: t.String(),
    }),
  })
  .model({
    name: t.Object({
      name: t.String(),
    }),
  });
