import { Device } from '@prisma/client';
import db from '../database/client';
import { NotFoundError } from 'elysia';
import { type PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import logger, { formatLog } from '../utils/logger';

const DeviceService = {
  getAll() {
    return db.device.findMany();
  },

  getOne(id: number) {
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
    logger.info(`Device '${device.desc}' created with ID '${createdDevice.id}'.`);
    return createdDevice;
  },

  updateOne(id: number, device: Partial<Device>) {
    return db.device.update({
      where: {
        id: id,
      },
      data: device,
    });
  },

  async deleteOne(id: number) {
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
      message: `Device ${deletedDevice.desc} <${deletedDevice.id}> deleted.`,
    };
  },
};

export default DeviceService;
