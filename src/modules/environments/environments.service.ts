import { Environment } from '@prisma/client';
import { type PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NotFoundError } from 'elysia';
import db from '../../database/client';
import logger, { formatLog } from '../../utils/logger';

export const environmentService = {
  getAll() {
    return db.environment.findMany();
  },

  getOne(id: number) {
    return db.environment.findUnique({
      where: {
        id: id,
      },
    });
  },

  async addOne(environment: Omit<Environment, 'id'>) {
    const createdBrowser = await db.environment.create({
      data: environment,
    });
    logger.info(
      `Browser '${environment.name}' created with ID '${createdBrowser.id}'.`,
    );
    return createdBrowser;
  },

  updateOne(id: number, environment: Partial<Environment>) {
    return db.environment.update({
      where: {
        id: id,
      },
      data: environment,
    });
  },

  async deleteOne(id: number) {
    let deletedEnvironment: Environment;
    try {
      deletedEnvironment = await db.environment.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      logger.error(formatLog((error as PrismaClientKnownRequestError).message));
      throw new NotFoundError(
        `Environment with id '${id}' could not be found or deleted.\nCheck system logs for more details.`,
      );
    }

    return {
      message: `Environment ${deletedEnvironment.name} <${deletedEnvironment.id}> deleted.`,
    };
  },
};

export default environmentService;
