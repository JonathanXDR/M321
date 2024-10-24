import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @Get()
  @ApiTags('default')
  getWelcome(): string {
    return this.appService.getWelcome();
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  @ApiTags('authentication')
  async login(@CurrentUser() user: User) {
    return this.authService.login(user);
  }
}
