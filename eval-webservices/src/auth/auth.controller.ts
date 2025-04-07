import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

type UserLoginPayload = {
  email: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('loginByClientPortal')
  loginByClientPortal(
    userLoginPayload: UserLoginPayload,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log('login');
    this.authService.loginByClientPortal(res);
  }
  @Get('login')
  login(userLoginPayload: UserLoginPayload) {
    console.log('login');
    this.authService.login(userLoginPayload);
  }

  @Get('callback')
  callback(@Req() req: Request, @Res() res: Response) {
    console.log('callback');
    return this.authService.callback(req, res);
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    this.authService.logout(req, res);
  }
}
