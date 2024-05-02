import { Elysia, t } from 'elysia';

export const browserModel = new Elysia()
  .model({
    browser: t.Object({
      name: t.String(),
      active: t.Boolean(),
    }),
  })
  .model({
    id: t.Object({
      id: t.Numeric(),
    }),
  });
