import { t } from 'elysia';

const IdDTO = t.Object({
  id: t.Numeric(),
});

const UserDTO = t.Object({
  name: t.String(),
  lastName: t.String(),
  email: t.String({ format: 'email' }),
  password: t.String(),
  type: t.String(),
  role: t.String(),
  active: t.Boolean(),
});

export { IdDTO, UserDTO };
