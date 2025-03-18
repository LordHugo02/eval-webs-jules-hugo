import { Field, ID, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { ReservationType } from './reservation.resolver';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from 'src/entities/room.entity';
import { Repository } from 'typeorm';

@ObjectType()
export class RoomType {
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

  @Field(() => [ReservationType], {
    nullable: true,
  })
  reservations: ReservationType[];
}

@Resolver(() => RoomType)
export class StudentResolver {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  @Query(() => [RoomType])
  async rooms(): Promise<RoomEntity[]> {
    return this.roomRepository.find();
  }
}
