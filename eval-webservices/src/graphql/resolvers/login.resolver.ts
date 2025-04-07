import {
  Args,
  Context,
  Field,
  Mutation,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { LoginInput } from '../dto/login-input';

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;
}

@Resolver()
export class LoginResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args('input') input: LoginInput, @Context() context) {
    const token = await this.authService.login(input);
    context.res.setHeader('Authorization', `Bearer ${token}`);
    context.res.setHeader('Access-Control-Expose-Headers', 'Authorization');

    return {
      token,
    };
  }
}
