import { ApiTags } from '@nestjs/swagger';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  @ApiTags('authentication')
  async login(@CurrentUser() user) {
    return this.authService.login(user);
  }
}
