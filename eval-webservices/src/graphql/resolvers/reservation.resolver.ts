import {
  Args,
  Field,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { UserType } from './user.resolver';
import { RoomType } from './room.resolver';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationsEntity } from 'src/entities/reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationInput } from '../dto/create-reservation.input';
import { UpdateReservationInput } from '../dto/update-reservation.input';

@ObjectType()
export class ReservationType {
  @Field(() => ID)
  id: string;

  @Field()
  room_id: string;

  @Field()
  user_id: string;

  @Field()
  status: string;

  @Field()
  start_time: Date;

  @Field()
  end_time: Date;

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

  @Query(() => [ReservationType])
  async listReservations(): Promise<ReservationsEntity[]> {
    return this.reservationRepository.find();
  }

  @Mutation(() => ReservationType)
  async createReservation(
    @Args('input') input: CreateReservationInput,
  ): Promise<ReservationsEntity> {
    const reservation = this.reservationRepository.create(input);
    return this.reservationRepository.save(reservation);
  }

  @Mutation(() => ReservationType, { nullable: true })
  async updateReservation(
    @Args('id') id: string,
    @Args('input') input: UpdateReservationInput,
  ): Promise<ReservationsEntity> {
    await this.reservationRepository.update(id, input);
    const room = await this.reservationRepository.findOne({ where: { id } });
    if (!room) {
      throw new Error(`Room with ID ${id} not found`);
    }
    return room;
  }
}
