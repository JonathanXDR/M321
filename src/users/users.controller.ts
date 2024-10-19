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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { UserRequest } from './dto/user.request';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  @Get()
  @ApiOkResponse({ type: [UserEntity] })
  getAllUsers(@CurrentUser() user: User): Promise<User[]> {
    return this.usersService.findMany(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @ApiOkResponse({ type: UserEntity })
  getCurrentUser(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findOneById(user.id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  @Get('/:id')
  @ApiOkResponse({ type: UserEntity })
  getUser(@Param('id') id: string): Promise<User> {
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  createUser(@Body() body: UserRequest): Promise<User> {
    return this.usersService.createUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/me')
  @ApiOkResponse({ type: UserEntity })
  updateUser(
    @CurrentUser() user: User,
    @Body() body: UserRequest,
  ): Promise<User> {
    return this.usersService.updateUser(user, user.id, body);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  @Put('/:id')
  @ApiOkResponse({ type: UserEntity })
  updateOtherUser(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() body: UserRequest,
  ): Promise<User> {
    return this.usersService.updateUser(user, id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/me')
  @ApiOkResponse({ type: UserEntity })
  deleteUser(@CurrentUser() user: User): Promise<User> {
    return this.usersService.deleteUser(user, user.id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  @Delete('/:id')
  @ApiOkResponse({ type: UserEntity })
  deleteOtherUser(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<User> {
    return this.usersService.deleteUser(user, id);
  }
}
