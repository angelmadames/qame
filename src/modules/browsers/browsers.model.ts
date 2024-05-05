import { Elysia, t } from 'elysia';

export const browserModel = new Elysia()
  .model({
    browser: t.Object({
      name: t.String(),
      browserEngineId: t.String(),
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
