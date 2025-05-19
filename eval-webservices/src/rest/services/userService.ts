import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createObjectCsvWriter } from 'csv-writer';
import * as path from 'path';
import { Repository } from 'typeorm';
import { ReservationsEntity } from '../../entities/reservations.entity';
import { RoomEntity } from '../../entities/room.entity';
import { UserEntity } from '../../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { KeycloakService } from './keycloak.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly keycloakService: KeycloakService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const token = await this.keycloakService.login(
      loginDto.email,
      loginDto.password,
    );
    return { accessToken: token };
  }

  async findAll(skip?: number, limit?: number): Promise<UserEntity[]> {
    return await this.userRepository.find({
      skip: skip || 0,
      take: limit || 10,
    });
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    // Create user in Keycloak first
    const keycloakUser = await this.keycloakService.createUser(createUserDto);

    // Then create user in local database
    const newUser = this.userRepository.create({
      keycloakId: keycloakUser.id,
      email: createUserDto.email,
    });

    return await this.userRepository.save(newUser);
  }

  async generateReservationsCsv(userId: string): Promise<{ url: string }> {
    const user = await this.findOne(userId);

    // Get user's reservations
    const reservations = (await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.reservations', 'reservation')
      .leftJoinAndSelect('reservation.room', 'room')
      .where('user.id = :userId', { userId })
      .getOne()) as UserEntity & {
      reservations: Array<
        ReservationsEntity & {
          room: RoomEntity;
        }
      >;
    };

    if (!reservations) {
      throw new NotFoundException(`No reservations found for user ${userId}`);
    }

    // Create CSV file
    const csvPath = path.join(
      process.cwd(),
      'temp',
      `${userId}-reservations.csv`,
    );
    const csvWriter = createObjectCsvWriter({
      path: csvPath,
      header: [
        { id: 'id', title: 'Reservation ID' },
        { id: 'roomName', title: 'Room Name' },
        { id: 'startTime', title: 'Start Time' },
        { id: 'endTime', title: 'End Time' },
      ],
    });

    const records = reservations.reservations.map((reservation) => {
      const room = reservation.room as unknown as RoomEntity;
      return {
        id: reservation.id,
        roomName: room.name,
        startTime: reservation.start_time,
        endTime: reservation.end_time,
      };
    });

    await csvWriter.writeRecords(records);

    // Return the URL for downloading
    return {
      url: `/download/${userId}-reservations.csv`,
    };
  }
}
