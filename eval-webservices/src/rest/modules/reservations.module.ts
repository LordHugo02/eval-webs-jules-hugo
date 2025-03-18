// filepath: c:\Users\Hugo\Documents\Code\eval-webs-jules-hugo\eval-webservices\src\rest\modules\reservations.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsEntity } from 'src/entities/reservation.entity';
import { ReservationService } from '../services/reservationServices';
import { ReservationController } from '../controllers/reservationController';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationsEntity])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationsModule {}
