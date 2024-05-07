import { ApplicationEnvironment } from '@prisma/client';
import { type PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NotFoundError } from 'elysia';
import db from '../../database/client';
import logger, { formatLog } from '../../utils/logger';

export const environmentService = {
  getAll() {
    return db.applicationEnvironment.findMany();
  },

  getOneById(id: string) {
    return db.applicationEnvironment.findUnique({
      where: {
        id: id,
      },
    });
  },

  async addOne(environment: Omit<ApplicationEnvironment, 'id'>) {
    const createdEnv = await db.applicationEnvironment.create({
      data: environment,
    });
    logger.info(
      `Environment '${environment.name}' created with ID '${createdEnv.id}'.`,
    );
    return createdEnv;
  },

  async updateOne(id: string, environment: Partial<ApplicationEnvironment>) {
    let updatedEnvironment: ApplicationEnvironment;
    try {
      updatedEnvironment = await db.applicationEnvironment.update({
        where: {
          id: id,
        },
        data: environment,
      });
      logger.info(`Environment with ID '${updatedEnvironment.id}' updated with new name: ${environment.name}.`);
      return {
        message: `Environment ${updatedEnvironment.id} updated with new name: ${environment.name}.`
      };
    } catch (error) {
      logger.error(formatLog((error as PrismaClientKnownRequestError).message));
      throw new NotFoundError(
        `Environment with ID '${id}' could not updated.\nCheck system logs for more details.`,
      );
    }
  },

  async deleteOne(id: string) {
    let deletedEnvironment: ApplicationEnvironment;
    try {
      deletedEnvironment = await db.applicationEnvironment.delete({
        where: {
          id: id,
        },
      });
      logger.info(`Environment '${deletedEnvironment.name}' <${deletedEnvironment.id}> deleted.`);
    } catch (error) {
      logger.error(formatLog((error as PrismaClientKnownRequestError).message));
      throw new NotFoundError(
        `Environment with ID '${id}' could not be found or deleted.\nCheck system logs for more details.`,
      );
    }

    return {
      message: `Environment '${deletedEnvironment.name}' deleted.`,
    };
  },
};

export default environmentService;
