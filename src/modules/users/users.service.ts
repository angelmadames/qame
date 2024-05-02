import { User } from '@prisma/client';
import { type PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NotFoundError } from 'elysia';
import db from '../../database/client';
import logger, { formatLog } from '../../utils/logger';

export const userService = {
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

  async addOne(user: Omit<User, 'id'>) {
    const createdUser = await db.user.create({
      data: user,
    });
    logger.info(
      `User '${user.name} <${user.email}>' created with ID '${createdUser.id}'.`,
    );
    return createdUser;
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

export default userService;
