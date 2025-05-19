import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';
import { UserEntity } from './user.entity';

@Entity('reservations')
export class ReservationsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'room_id' })
  roomId: string;

  @Column({ name: 'start_time' })
  start_time: Date;

  @Column({ name: 'end_time' })
  end_time: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => RoomEntity)
  @JoinColumn({ name: 'room_id' })
  room: RoomEntity;
}
