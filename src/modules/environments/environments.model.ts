import { Elysia, t } from 'elysia';

export const environmentModel = new Elysia().model({
  'environment.id': t.Object({ id: t.String() }),
  'environment.name': t.Object({
    name: t.String(),
  }),
})
