import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoomEntity } from 'src/entities/room.entity';
import { CreateRoomDto } from '../dto/create-room.dto';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { RoomService } from '../services/roomService';

@ApiTags('rooms') // Ajoute une catégorie "rooms" dans Swagger
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  // Get all rooms
  @UseGuards(AuthGuard)
  @Get()
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Query('skip') skip?: number,
    @Query('limit') limit?: number,
  ): Promise<{ rooms: RoomEntity[] }> {
    const rooms = await this.roomService.findAll(skip, limit);
    return { rooms };
  }

  // Get a single room by ID
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RoomEntity> {
    return await this.roomService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createRoomDto: CreateRoomDto): Promise<RoomEntity> {
    return await this.roomService.create(createRoomDto);
  }

  // Update a room by ID
  @UseGuards(AuthGuard)
  @Put(':id')
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
