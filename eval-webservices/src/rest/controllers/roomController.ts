import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';

import { RoomService } from '../services/roomService';
import { RoomEntity } from 'src/entities/room.entity';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateRoomDto } from '../dto/create-room.dto';

@ApiBearerAuth()
@ApiTags('rooms') // Ajoute une catégorie "rooms" dans Swagger
@Controller('api/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  // Get all rooms
  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<RoomEntity[]> {
    return await this.roomService.findAll();
  }

  // Get a single room by ID
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RoomEntity> {
    return await this.roomService.findOne(id);
  }

  // Create a new room
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createRoomDto: CreateRoomDto): Promise<RoomEntity> {
    return await this.roomService.create(createRoomDto);
  }

  // Update a room by ID
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<RoomEntity> {
    return await this.roomService.update(id, updateRoomDto);
  }

  // Delete a room by ID
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.roomService.remove(id);
  }
}
