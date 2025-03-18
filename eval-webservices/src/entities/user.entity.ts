import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  keycloak_id: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  created_at: Date;
}
