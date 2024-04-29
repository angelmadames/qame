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

  addOne(device: Omit<Device, 'id'>) {
    return db.device.create({
      data: device,
    });
  },

  updateOne(id: number, user: Partial<Device>) {
    return db.user.update({
      where: {
        id: id,
      },
      data: user,
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
        `User with id '${id}' could not be found or deleted.\nCheck system logs for more details.`,
      );
    }

    return {
      message: `Device ${deletedDevice.desc} <${deletedDevice.id}> deleted.`,
    };
  },
};

export default DeviceService;
