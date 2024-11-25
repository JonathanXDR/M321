import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

jest.mock('../users/users.service');
jest.mock('@nestjs/jwt');
jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

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
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should return a user if the credentials are valid', async () => {
      (usersService.findOneByUsername as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.validateUser(
        'testuser',
        'plainpassword',
      );

      expect(result).toEqual(mockUser);
      expect(usersService.findOneByUsername).toHaveBeenCalledWith('testuser');
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'plainpassword',
        'hashedpassword',
      );
    });

    it('should return null if the user is not found', async () => {
      (usersService.findOneByUsername as jest.Mock).mockResolvedValue(null);

      const result = await authService.validateUser(
        'invaliduser',
        'plainpassword',
      );

      expect(result).toBeNull();
      expect(usersService.findOneByUsername).toHaveBeenCalledWith(
        'invaliduser',
      );
    });

    it('should return null if the password is incorrect', async () => {
      (usersService.findOneByUsername as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await authService.validateUser(
        'testuser',
        'wrongpassword',
      );

      expect(result).toBeNull();
      expect(usersService.findOneByUsername).toHaveBeenCalledWith('testuser');
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'wrongpassword',
        'hashedpassword',
      );
    });
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      (jwtService.sign as jest.Mock).mockReturnValue('mockedToken');

      const result = await authService.login(mockUser);

      expect(result).toEqual({ access_token: 'mockedToken' });
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: mockUser.username,
        sub: mockUser.id,
      });
    });
  });
});
