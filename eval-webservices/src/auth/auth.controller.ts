import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      const token = await this.authService.login(payload);
      if (!token || token.error) {
        // Gestion des erreurs retournées par Keycloak
        if (token.error === 'invalid_grant') {
          throw new UnauthorizedException('Invalid credentials');
        }
        throw new BadRequestException(
          token.error_description || 'Authentication failed',
        );
      }
      return token;
    } catch (error) {
      // Gestion des erreurs inattendues
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.error('Login error:', error);
      throw new InternalServerErrorException('Internal server error');
    }
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
