import { ApplicationEnvironment } from '@prisma/client';
import { type PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NotFoundError } from 'elysia';
import db from '../../database/client';
import logger, { formatLog } from '../../utils/logger';

export const environmentService = {
  getAll() {
    return db.applicationEnvironment.findMany();
  },

  getOne(id: string) {
    return db.applicationEnvironment.findUnique({
      where: {
        id: id,
      },
    });
  },

  async addOne(environment: Omit<ApplicationEnvironment, 'id'>) {
    const createdBrowser = await db.applicationEnvironment.create({
      data: environment,
    });
    logger.info(
      `Browser '${environment.name}' created with ID '${createdBrowser.id}'.`,
    );
    return createdBrowser;
  },

  updateOne(id: string, environment: Partial<ApplicationEnvironment>) {
    return db.applicationEnvironment.update({
      where: {
        id: id,
      },
      data: environment,
    });
  },

  async deleteOne(id: string) {
    let deletedEnvironment: ApplicationEnvironment;
    try {
      deletedEnvironment = await db.applicationEnvironment.delete({
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
