import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let req: Request;

    if (context.getType() === 'http') {
      // ✅ Cas d'une requête REST
      req = context.switchToHttp().getRequest();
    } else {
      // ✅ Cas d'une requête GraphQL
      const gqlContext = GqlExecutionContext.create(context);
      req = gqlContext.getContext<{ req: Request }>().req;
    }
    const accessToken: string | undefined = req.cookies?.[
      'access_token'
    ] as string;

    if (!accessToken) {
      throw new UnauthorizedException('No token provided');
    }
    return await this.authService.check_authorization(accessToken);
  }
}
