import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../../auth/auth.guard';
import { UserService } from '../../rest/services/userService';
import { LoginInput } from '../dto/login.input';
import { User } from '../types/user.type';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  @UseGuards(AuthGuard)
  async listUsers(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ): Promise<User[]> {
    return await this.userService.findAll(skip, limit);
  }

  @Query(() => User, { nullable: true })
  @UseGuards(AuthGuard)
  async user(@Args('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Mutation(() => {
    accessToken: string;
  })
  async login(
    @Args('input') input: LoginInput,
  ): Promise<{ accessToken: string }> {
    return await this.userService.login(input);
  }
}
