import { Elysia, t } from 'elysia';

export const userModel = new Elysia()
  .model({
    user: t.Object({
      name: t.String(),
      lastName: t.String(),
      email: t.String({ format: 'email' }),
      password: t.String(),
      type: t.String(),
      role: t.String(),
      active: t.Boolean(),
    }),
  })
  .model({
    id: t.Object({
      id: t.String(),
    }),
  });
