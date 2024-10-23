import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserRequest } from './dto/user.request';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findMany(user: User): Promise<User[]> {
    if (user.role !== 'admin') {
      throw new ForbiddenException('Forbidden');
    }
    return this.prisma.user.findMany();
  }

  async findOneById(id: string): Promise<User> {
    const foundUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!foundUser) {
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

  async createUser(body: UserRequest): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { username: body.username },
    });
    if (existingUser) {
      throw new ConflictException('Username already taken');
    }
    return this.prisma.user.create({
      data: { ...body, role: 'user' } as User,
    });
  }

  async updateUser(user: User, id: string, body: UserRequest): Promise<User> {
    if (user.id !== id && user.role !== 'admin') {
      throw new ForbiddenException('Forbidden');
    }
    const foundUser = await this.findOneById(id);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id },
      data: { ...body } as User,
    });
  }

  async deleteUser(user: User, id: string): Promise<User> {
    if (user.id !== id && user.role !== 'admin') {
      throw new ForbiddenException('Forbidden');
    }
    const foundUser = await this.findOneById(id);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
