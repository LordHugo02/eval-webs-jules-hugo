import { Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(UserEntity)
    private readonly studentRepository: Repository<UserEntity>,
  ) {}

  // @Mutation(() => AuthResponse)
  // login(@Args('input') input: Response): AuthResponse {
  //   const user = this.authService.login(input);
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  //   return this.authService.login(user);
  // }
}
