import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

type UserLoginPayload = {
  email: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('loginByClientPortal')
  loginByClientPortal(@Req() req: Request, @Res() res: Response) {
    console.log('login');
    return this.authService.loginByClientPortal(res);
  }
  @Post('login')
  async login(@Body() payload: UserLoginPayload) {
    const token = await this.authService.login(payload);
    return token; // Nest gère le res.status(200).json(token)
  }

  @Get('callback')
  callback(@Req() req: Request, @Res() res: Response) {
    console.log('callback');
    return this.authService.callback(req, res);
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }
}
