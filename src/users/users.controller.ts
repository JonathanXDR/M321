import {
  Controller,
  Get,
  Param,
  NotFoundException,
  UseGuards,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { UserRequest } from './dto/user.request';

@UseGuards(JwtAuthGuard)
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [UserEntity] })
  getAllUsers(@CurrentUser() user: User): Promise<User[]> {
    return this.usersService.findMany(user);
  }

  @Get('/me')
  @ApiOkResponse({ type: UserEntity })
  getCurrentUser(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findOneById(user, user.id);
  }

  @Get('/:id')
  @ApiOkResponse({ type: UserEntity })
  getUser(@CurrentUser() user: User, @Param('id') id: string): Promise<User> {
    try {
      return this.usersService.findOneById(user, id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  createUser(
    @CurrentUser() user: User,
    @Body() body: UserRequest,
  ): Promise<User> {
    return this.usersService.createUser(user, body);
  }

  @Put('/:id')
  @ApiOkResponse({ type: UserEntity })
  updateUser(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() body: UserRequest,
  ): Promise<User> {
    return this.usersService.updateUser(user, id, body);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: UserEntity })
  deleteUser(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<User> {
    return this.usersService.deleteUser(user, id);
  }
}
