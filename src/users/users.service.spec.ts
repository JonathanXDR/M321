import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { NotFoundException } from '@nestjs/common';
import { UserRequest } from './dto/user.request';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<UsersService>;

  // Mock user based on the updated User type
  const mockUser = {
    id: '1',
    username: 'testuser',
    password: 'hashedpassword',
    firstName: 'Test',
    lastName: 'User',
    age: 25,
    gender: 'male',
    role: 'admin',
  };

  beforeEach(async () => {
    usersService = {
      findMany: jest.fn(),
      findOneById: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      (usersService.findMany as jest.Mock).mockResolvedValue([mockUser]);

      expect(await controller.getAllUsers(mockUser)).toEqual([mockUser]);
      expect(usersService.findMany).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('getCurrentUser', () => {
    it('should return the current user', async () => {
      (usersService.findOneById as jest.Mock).mockResolvedValue(mockUser);

      expect(await controller.getCurrentUser(mockUser)).toEqual(mockUser);
      expect(usersService.findOneById).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('getUser', () => {
    it('should return a user by ID', async () => {
      (usersService.findOneById as jest.Mock).mockResolvedValue(mockUser);

      expect(await controller.getUser(mockUser.id)).toEqual(mockUser);
      expect(usersService.findOneById).toHaveBeenCalledWith(mockUser.id);
    });

    it('should throw NotFoundException if user not found', async () => {
      (usersService.findOneById as jest.Mock).mockResolvedValue(null);

      await expect(controller.getUser('unknown')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userRequest: UserRequest = {
        username: 'newuser',
        password: 'password123',
        firstName: 'New',
        lastName: 'User',
        age: 30,
        gender: 'female',
      };
      (usersService.createUser as jest.Mock).mockResolvedValue(mockUser);

      expect(await controller.createUser(userRequest)).toEqual(mockUser);
      expect(usersService.createUser).toHaveBeenCalledWith(userRequest);
    });
  });

  describe('updateUser', () => {
    it('should update the current user', async () => {
      const userRequest: UserRequest = {
        username: 'updateduser',
        password: 'newpassword',
        firstName: 'Updated',
        lastName: 'User',
        age: 26,
        gender: 'male',
      };
      const updatedUser = { ...mockUser, ...userRequest };
      (usersService.updateUser as jest.Mock).mockResolvedValue(updatedUser);

      expect(await controller.updateUser(mockUser, userRequest)).toEqual(
        updatedUser,
      );
      expect(usersService.updateUser).toHaveBeenCalledWith(
        mockUser,
        mockUser.id,
        userRequest,
      );
    });
  });

  describe('updateOtherUser', () => {
    it('should update another user by ID', async () => {
      const userRequest: UserRequest = {
        username: 'otheruser',
        password: 'password456',
        firstName: 'Other',
        lastName: 'User',
        age: 40,
        gender: 'female',
      };
      const updatedUser = { ...mockUser, ...userRequest, id: '2' };
      (usersService.updateUser as jest.Mock).mockResolvedValue(updatedUser);

      expect(
        await controller.updateOtherUser(mockUser, '2', userRequest),
      ).toEqual(updatedUser);
      expect(usersService.updateUser).toHaveBeenCalledWith(
        mockUser,
        '2',
        userRequest,
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete the current user', async () => {
      (usersService.deleteUser as jest.Mock).mockResolvedValue(mockUser);

      expect(await controller.deleteUser(mockUser)).toEqual(mockUser);
      expect(usersService.deleteUser).toHaveBeenCalledWith(
        mockUser,
        mockUser.id,
      );
    });
  });

  describe('deleteOtherUser', () => {
    it('should delete another user by ID', async () => {
      (usersService.deleteUser as jest.Mock).mockResolvedValue(mockUser);

      expect(await controller.deleteOtherUser(mockUser, '2')).toEqual(mockUser);
      expect(usersService.deleteUser).toHaveBeenCalledWith(mockUser, '2');
    });
  });
});
