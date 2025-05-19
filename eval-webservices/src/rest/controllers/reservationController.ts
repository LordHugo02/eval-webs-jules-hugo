import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReservationsEntity } from 'src/entities/reservation.entity';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { ReservationService } from '../services/reservationServices';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new reservation' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Reservation created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async create(
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<ReservationsEntity> {
    return await this.reservationService.create(createReservationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reservations' })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of reservations' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid query parameters',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async findAll(
    @Query('skip') skip?: number,
    @Query('limit') limit?: number,
  ): Promise<{ reservations: ReservationsEntity[] }> {
    const reservations = await this.reservationService.findAll(skip, limit);
    return { reservations };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a reservation by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Reservation details' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Reservation not found',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async findOne(@Param('id') id: string): Promise<ReservationsEntity> {
    return await this.reservationService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a reservation by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reservation updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Reservation not found',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationsEntity> {
    return await this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a reservation by ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Reservation deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Reservation not found',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.reservationService.remove(id);
  }
}
