import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  ID,
  Int,
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
import { ReservationService } from '../../rest/services/reservationServices';
import { CreateReservationInput } from '../dto/create-reservation.input';
import { UpdateReservationInput } from '../dto/update-reservation.input';
import { Reservation } from '../types/reservation.type';
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

@Resolver(() => Reservation)
export class ReservationResolver {
  private notificationService: NotificationService;
  constructor(
    @Inject('NOTIFICATION_PROTO_PACKAGE')
    private readonly notificationClientGRPC: ClientGrpc,
    @InjectRepository(ReservationsEntity)
    private readonly reservationRepository: Repository<ReservationsEntity>,
    private readonly reservationService: ReservationService,
  ) {}

  onModuleInit() {
    this.notificationService =
      this.notificationClientGRPC.getService<NotificationService>(
        'NotificationService',
      );
  }

  @Query(() => [Reservation])
  @UseGuards(AuthGuard)
  async listReservations(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ): Promise<Reservation[]> {
    return await this.reservationService.findAll(skip, limit);
  }

  @Query(() => Reservation, { nullable: true })
  @UseGuards(AuthGuard)
  async reservation(@Args('id') id: string): Promise<Reservation> {
    return await this.reservationService.findOne(id);
  }

  @Mutation(() => Reservation)
  @UseGuards(AuthGuard)
  async createReservation(
    @Args('input') input: CreateReservationInput,
  ): Promise<Reservation> {
    return await this.reservationService.create(input);
  }

  @Mutation(() => Reservation)
  @UseGuards(AuthGuard)
  async updateReservation(
    @Args('input') input: UpdateReservationInput,
  ): Promise<Reservation> {
    return await this.reservationService.update(input.id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async deleteReservation(@Args('id') id: string): Promise<boolean> {
    await this.reservationService.remove(id);
    return true;
  }
}
