import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator((ctx: ExecutionContext) => {
  const user = ctx.switchToHttp().getRequest().user;
  if (!user) {
    throw new UnauthorizedException();
  }
  return user;
});
