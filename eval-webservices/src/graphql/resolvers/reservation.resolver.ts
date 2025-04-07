import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';
import { ReservationsEntity } from 'src/entities/reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationInput } from '../dto/create-reservation.input';
import { UpdateReservationInput } from '../dto/update-reservation.input';
import { RoomType } from './room.resolver';
import { UserType } from './user.resolver';

@ObjectType()
export class ReservationType {
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

  @Field(() => [UserType], {
    nullable: true,
  })
  users: UserType[];

  @Field(() => [RoomType], {
    nullable: true,
  })
  rooms: RoomType[];
}

interface NotificationService {
  createNotification(data: any): Observable<any>;
  updateNotification(data: any): Observable<any>;
  getNotification(data: any): Observable<any>;
}

@Resolver(() => ReservationType)
export class ReservationResolver {
  private notificationService: NotificationService;
  constructor(
    @Inject('NOTIFICATION_PROTO_PACKAGE')
    private readonly notificationClientGRPC: ClientGrpc,
    @InjectRepository(ReservationsEntity)
    private readonly reservationRepository: Repository<ReservationsEntity>,
  ) {}

  onModuleInit() {
    this.notificationService =
      this.notificationClientGRPC.getService<NotificationService>(
        'NotificationService',
      );
  }

  @Query(() => [ReservationType])
  @UseGuards(AuthGuard)
  async listReservations(): Promise<ReservationsEntity[]> {
    return this.reservationRepository.find();
  }

  @Mutation(() => ReservationType)
  @UseGuards(AuthGuard)
  async createReservation(
    @Args('input') input: CreateReservationInput,
  ): Promise<ReservationsEntity> {
    const reservation = this.reservationRepository.create(input);
    this.notificationService.createNotification({
      reservation_id: reservation.id,
      message: 'Reservation created',
    });

    return this.reservationRepository.save(reservation);
  }

  @Mutation(() => ReservationType, { nullable: true })
  @UseGuards(AuthGuard)
  async updateReservation(
    @Args('id') id: string,
    @Args('input') input: UpdateReservationInput,
  ): Promise<ReservationsEntity> {
    await this.reservationRepository.update(id, input);
    this.notificationService.updateNotification({
      reservation_id: id,
      message: 'Reservation updated',
    });
    const room = await this.reservationRepository.findOne({ where: { id } });
    if (!room) {
      throw new Error(`Room with ID ${id} not found`);
    }
    return room;
  }
}
