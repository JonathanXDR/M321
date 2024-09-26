import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

@Controller()
@ApiTags('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get('users')
  @ApiOkResponse({ type: [UserEntity] })
  async getAllUsers(): Promise<UserModel[]> {
    return this.UsersService.findMany({});
  }

  @Get('users/:id')
  @ApiOkResponse({ type: UserEntity })
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.UsersService.findOne(id);
  }

  @Post('users')
  @ApiCreatedResponse({ type: UserEntity })
  async createUser(@Body() data: UserModel): Promise<UserModel> {
    return this.UsersService.createUser(data);
  }

  @Put('users/:id')
  @ApiOkResponse({ type: UserEntity })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserModel,
  ): Promise<UserModel> {
    return this.UsersService.updateUser({ where: { id: id }, data: data });
  }

  @Delete('users/:id')
  @ApiOkResponse({ type: UserEntity })
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.UsersService.deleteUser({ id: id });
  }
}
