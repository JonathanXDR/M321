import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { UserRequest } from './dto/user.request';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findMany(user: User): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { id: user.id },
    });
  }

  async findOneById(user: User, id: string): Promise<User> {
    const foundUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!foundUser || foundUser.id !== user.id) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  async findOneByUsername(username: string): Promise<User> {
    const foundUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  async createUser(user: User, body: UserRequest): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { username: body.username },
    });
    if (existingUser) {
      throw new ConflictException('Username already taken');
    }
    return this.prisma.user.create({
      data: { ...body, id: user.id } as User,
    });
  }

  async updateUser(user: User, id: string, body: UserRequest): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { ...body, id: user.id } as User,
    });
  }

  async deleteUser(user: User, id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
