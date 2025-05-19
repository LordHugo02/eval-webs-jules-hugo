import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../../auth/auth.guard';
import { RoomService } from '../../rest/services/roomService';
import { CreateRoomInput } from '../dto/create-room.input';
import { UpdateRoomInput } from '../dto/update-room.input';
import { Room } from '../types/room.type';

@Resolver(() => Room)
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Query(() => [Room])
  @UseGuards(AuthGuard)
  async listRooms(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ): Promise<Room[]> {
    return await this.roomService.findAll(skip, limit);
  }

  @Query(() => Room, { nullable: true })
  @UseGuards(AuthGuard)
  async room(@Args('id') id: string): Promise<Room> {
    return await this.roomService.findOne(id);
  }

  @Mutation(() => Room)
  @UseGuards(AuthGuard)
  async createRoom(@Args('input') input: CreateRoomInput): Promise<Room> {
    return await this.roomService.create(input);
  }

  @Mutation(() => Room)
  @UseGuards(AuthGuard)
  async updateRoom(@Args('input') input: UpdateRoomInput): Promise<Room> {
    return await this.roomService.update(input.id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async deleteRoom(@Args('id') id: string): Promise<boolean> {
    await this.roomService.remove(id);
    return true;
  }
}
