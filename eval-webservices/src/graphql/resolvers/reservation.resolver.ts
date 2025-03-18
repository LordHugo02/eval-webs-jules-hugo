import { Field, ID, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.resolver';
import { RoomType } from './room.resolver';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationsEntity } from 'src/entities/reservation.entity';
import { Repository } from 'typeorm';

@ObjectType()
export class ReservationType {
  @Field(() => ID)
  id: string;

  @Field()
  keycloak_id: string;

  @Field()
  email: string;

  @Field()
  created_at: Date;

  @Field(() => [UserType], {
    nullable: true,
  })
  users: UserType[];

  @Field(() => [RoomType], {
    nullable: true,
  })
  rooms: RoomType[];
}

@Resolver(() => UserType)
export class ReservationResolver {
  constructor(
    @InjectRepository(ReservationsEntity)
    private readonly reservationRepository: Repository<ReservationsEntity>,
  ) {}

  @Query(() => [UserType])
  async users(): Promise<ReservationsEntity[]> {
    return this.reservationRepository.find();
  }
}
