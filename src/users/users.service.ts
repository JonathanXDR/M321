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

  /**
   * Retrieves all users from the database.
   * @param user The user making the request, used to check if they have admin privileges.
   * @returns A promise that resolves to an array of `User` objects.
   * @throws {ForbiddenException} If the requesting user is not an admin.
   */
  async findMany(user: User): Promise<User[]> {
    if (user.role !== 'admin') {
      throw new ForbiddenException('Forbidden');
    }
    return this.prisma.user.findMany();
  }

  /**
   * Finds a user by their unique identifier.
   * @param id The unique ID of the user to retrieve.
   * @returns A promise that resolves to a `User` object.
   * @throws {NotFoundException} If no user is found with the provided ID.
   */
  async findOneById(id: string): Promise<User> {
    const foundUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  /**
   * Finds a user by their username.
   * @param username The username of the user to retrieve.
   * @returns A promise that resolves to a `User` object.
   * @throws {NotFoundException} If no user is found with the provided username.
   */
  async findOneByUsername(username: string): Promise<User> {
    const foundUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  /**
   * Creates a new user in the database.
   * @param body The data for the new user, provided as a `UserRequest` object.
   * @returns A promise that resolves to the newly created `User` object.
   * @throws {ConflictException} If a user already exists with the provided username.
   */
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

  /**
   * Updates an existing user's information.
   * @param user The user making the request, used to check authorization.
   * @param id The unique ID of the user to update.
   * @param body The updated data for the user, provided as a `UserRequest` object.
   * @returns A promise that resolves to the updated `User` object.
   * @throws {ForbiddenException} If the requesting user is not the user being updated and is not an admin.
   * @throws {NotFoundException} If no user is found with the provided ID.
   */
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

  /**
   * Deletes a user from the database.
   * @param user The user making the request, used to check authorization.
   * @param id The unique ID of the user to delete.
   * @returns A promise that resolves to the deleted `User` object.
   * @throws {ForbiddenException} If the requesting user is not the user being deleted and is not an admin.
   * @throws {NotFoundException} If no user is found with the provided ID.
   */
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
