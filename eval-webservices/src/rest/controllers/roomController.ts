import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from '../services/roomService';
import { RoomEntity } from 'src/entities/room.entity';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('rooms') // Ajoute une catégorie "rooms" dans Swagger
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  // Get all rooms
  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<RoomEntity[]> {
    return await this.roomService.findAll();
  }

  // Get a single room by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RoomEntity> {
    return await this.roomService.findOne(id);
  }

  // Update a room by ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<RoomEntity> {
    return await this.roomService.update(id, updateRoomDto);
  }

  // Delete a room by ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.roomService.remove(id);
  }
}
