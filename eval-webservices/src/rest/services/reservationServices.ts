import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationsEntity } from 'src/entities/reservation.entity';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { validate as isUuid } from 'uuid';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationsEntity)
    private readonly reservationRepository: Repository<ReservationsEntity>,
  ) {}

  // Create a new reservation
  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<ReservationsEntity> {
    if (
      !isUuid(createReservationDto.user_id) ||
      !isUuid(createReservationDto.room_id)
    ) {
      throw new BadRequestException('user_id and room_id must be valid UUIDs');
    }

    // Vérifie que le user existe
    const user = await this.reservationRepository.manager.findOne(
      'UserEntity',
      {
        where: { id: createReservationDto.user_id },
      },
    );
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    // Vérifie que la room existe
    const room = await this.reservationRepository.manager.findOne(
      'RoomEntity',
      {
        where: { id: createReservationDto.room_id },
      },
    );
    if (!room) {
      throw new BadRequestException('Room does not exist');
    }

    const newReservation =
      this.reservationRepository.create(createReservationDto);
    return await this.reservationRepository.save(newReservation);
  }

  // Find all reservations
  async findAll(): Promise<ReservationsEntity[]> {
    return await this.reservationRepository.find({
      relations: ['user', 'room'],
    });
  }

  // Find one reservation by ID
  async findOne(id: string): Promise<ReservationsEntity> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['user', 'room'],
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  // Update a reservation by ID
  async update(
    id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationsEntity> {
    const reservation = await this.findOne(id); // Ensure the reservation exists
    const updatedReservation = Object.assign(reservation, updateReservationDto);
    return await this.reservationRepository.save(updatedReservation);
  }

  // Remove a reservation by ID
  async remove(id: string): Promise<void> {
    const reservation = await this.findOne(id); // Ensure the reservation exists
    await this.reservationRepository.remove(reservation);
  }
}
