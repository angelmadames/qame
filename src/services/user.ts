import { User } from '@prisma/client';
import db from '../database/client';

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
    })
  }
};

export default UserService;
