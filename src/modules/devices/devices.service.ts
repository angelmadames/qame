import { Device } from '@prisma/client';
import { type PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NotFoundError } from 'elysia';
import db from '../../database/client';
import logger, { formatLog } from '../../utils/logger';

export const deviceService = {
  getAll() {
    return db.device.findMany();
  },

  getOne(id: string) {
    return db.device.findUnique({
      where: {
        id: id,
      },
    });
  },

  async addOne(device: Omit<Device, 'id'>) {
    const createdDevice = await db.device.create({
      data: device,
    });
    logger.info(
      `Device '${device.name}' created with ID '${createdDevice.id}'.`,
    );
    return createdDevice;
  },

  updateOne(id: string, device: Partial<Device>) {
    return db.device.update({
      where: {
        id: id,
      },
      data: device,
    });
  },

  async deleteOne(id: string) {
    let deletedDevice: Device;
    try {
      deletedDevice = await db.device.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      logger.error(formatLog((error as PrismaClientKnownRequestError).message));
      throw new NotFoundError(
        `Device with id '${id}' could not be found or deleted.\nCheck system logs for more details.`,
      );
    }

    return {
      message: `Device ${deletedDevice.name} <${deletedDevice.id}> deleted.`,
    };
  },
};

export default deviceService;
