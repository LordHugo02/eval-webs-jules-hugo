import { UseGuards } from '@nestjs/common';
import { Field, ID, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ReservationType } from './reservation.resolver';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  keycloak_id: string;

  @Field()
  email: string;

  @Field()
  created_at: Date;

  @Field(() => [ReservationType], {
    nullable: true,
  })
  reservations: ReservationType[];
}

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Query(() => [UserType])
  @UseGuards(AuthGuard)
  async listUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
