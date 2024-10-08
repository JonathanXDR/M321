import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: { where: Prisma.UserWhereInput }): Promise<User[]> {
    const { where } = params;
    return this.prisma.user.findMany({
      where,
    });
  }

  async findOneById(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User> {
    const { where } = params;
    const user = await this.prisma.user.findUnique({
      where,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByUsername(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User> {
    const { where } = params;
    const user = await this.prisma.user.findUnique({
      where,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
