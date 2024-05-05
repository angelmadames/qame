import { Browser } from '@prisma/client';
import { type PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NotFoundError } from 'elysia';
import db from '../../database/client';
import logger, { formatLog } from '../../utils/logger';

export const browserService = {
  getAll() {
    return db.browser.findMany();
  },

  getOneById(id: string) {
    return db.browser.findUnique({
      where: {
        id: id,
      },
    });
  },

  getOneByName(name: string) {
    return db.browser.findUnique({
      where: {
        name: name,
      },
    });
  },

  async addOne(browser: Omit<Browser, 'id'>) {
    const createdBrowser = await db.browser.create({
      data: browser,
    });
    logger.info(
      `Browser '${browser.name}' created with ID '${createdBrowser.id}'.`,
    );
    return createdBrowser;
  },

  updateOne(id: string, browser: Partial<Browser>) {
    return db.browser.update({
      where: {
        id: id,
      },
      data: browser,
    });
  },

  async deleteOne(id: string) {
    let deletedBrowser: Browser;
    try {
      deletedBrowser = await db.browser.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      logger.error(formatLog((error as PrismaClientKnownRequestError).message));
      throw new NotFoundError(
        `Browser with id '${id}' could not be found or deleted.\nCheck system logs for more details.`,
      );
    }

    return {
      message: `Browser ${deletedBrowser.name} <${deletedBrowser.id}> deleted.`,
    };
  },
};

export default browserService;
