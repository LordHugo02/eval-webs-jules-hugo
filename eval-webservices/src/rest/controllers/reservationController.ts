import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReservationService } from '../services/reservationServices';
import { ReservationsEntity } from 'src/entities/reservation.entity';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';

@ApiTags('reservations') // Ajoute une catégorie "reservations" dans Swagger
@Controller('api/reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new reservation' })
  async create(
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<ReservationsEntity> {
    return await this.reservationService.create(createReservationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reservations' })
  async findAll(): Promise<ReservationsEntity[]> {
    return await this.reservationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a reservation by ID' })
  async findOne(@Param('id') id: string): Promise<ReservationsEntity> {
    return await this.reservationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a reservation by ID' })
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationsEntity> {
    return await this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a reservation by ID' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.reservationService.remove(id);
  }
}
