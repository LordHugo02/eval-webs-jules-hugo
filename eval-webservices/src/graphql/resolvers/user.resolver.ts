import { Field, ID, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
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
export class StudentResolver {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Query(() => [UserType])
  async users(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
