import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoomEntity } from 'src/entities/room.entity';
import { Repository } from 'typeorm';
import { CreateRoomInput } from '../dto/create-room.input';
import { UpdateRoomInput } from '../dto/update-room.input';
import { ReservationType } from './reservation.resolver';

@ObjectType()
export class RoomType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  capacity: number;

  @Field({ nullable: true })
  location?: string;

  @Field()
  created_at: Date;

  @Field(() => [ReservationType], {
    nullable: true,
  })
  reservations: ReservationType[];
}

@Resolver(() => RoomType)
export class RoomResolver {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  @Query(() => [RoomType])
  @UseGuards(AuthGuard)
  async listRooms(): Promise<RoomEntity[]> {
    return this.roomRepository.find();
  }

  @Mutation(() => RoomType)
  @UseGuards(AuthGuard)
  async createRoom(@Args('input') input: CreateRoomInput): Promise<RoomEntity> {
    const user = this.roomRepository.create(input);
    return this.roomRepository.save(user);
  }

  @Mutation(() => RoomType, { nullable: true })
  @UseGuards(AuthGuard)
  async updateRoom(
    @Args('id') id: string,
    @Args('input') input: UpdateRoomInput,
  ): Promise<RoomEntity> {
    await this.roomRepository.update(id, input);
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) {
      throw new Error(`Room with ID ${id} not found`);
    }
    return room;
  }
}
