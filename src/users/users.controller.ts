import { UserRequest } from './dto/user.request';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [UserEntity] })
  async getAllUsers(): Promise<UserModel[]> {
    return this.usersService.findMany({});
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    try {
      return this.usersService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
