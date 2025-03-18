import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity'; // Assurez-vous que le chemin est correct
import { RoomEntity } from './room.entity';

@Entity('reservations')
export class ReservationsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => RoomEntity, (room) => room.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_id' })
  room: UserEntity;

  @Column()
  room_id: string;

  @CreateDateColumn()
  start_time: Date;

  @CreateDateColumn()
  end_time: Date;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;
}
