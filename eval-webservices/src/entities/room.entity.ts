import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReservationsEntity } from './reservations.entity';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  capacity: number;

  @Column({ nullable: true })
  location?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => ReservationsEntity, (reservation) => reservation.room)
  reservations: ReservationsEntity[];
}
