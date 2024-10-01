import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [UserEntity] })
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findMany({});
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async getUser(@Param('id') id: string): Promise<User> {
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
