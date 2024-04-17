import { User } from '@prisma/client';
import db from '../database/client';
import { NotFoundError } from 'elysia';
import { type PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import logger, { formatLog } from '../utils/logger';

const UserService = {
  getAll() {
    return db.user.findMany();
  },

  getOne(id: number) {
    return db.user.findUnique({
      where: {
        id: id,
      },
    });
  },

  addOne(user: Omit<User, 'id'>) {
    return db.user.create({
      data: user,
    });
  },

  updateOne(id: number, user: Partial<User>) {
    return db.user.update({
      where: {
        id: id,
      },
      data: user,
    });
  },

  async deleteOne(id: number) {
    let deletedUser: User;
    try {
      deletedUser = await db.user.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      logger.error(formatLog((error as PrismaClientKnownRequestError).message));
      throw new NotFoundError(
        `User with id '${id}' could not be found or deleted.\nCheck system logs for more details.`,
      );
    }

    return {
      message: `User ${deletedUser.name} <${deletedUser.email}> deleted.`,
    };
  },
};

export default UserService;
