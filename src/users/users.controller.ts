import {
  Controller,
  Get,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
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
    return this.usersService.findMany();
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserEntity })
  async getCurrentUser(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findOneById(user.id);
  }

  @Get('/:id')
  @ApiOkResponse({ type: UserEntity })
  async getUser(@Param('id') id: string): Promise<User> {
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
