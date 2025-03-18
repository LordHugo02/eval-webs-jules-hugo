import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from 'src/entities/room.entity';
import { RoomService } from '../services/roomService';
import { RoomController } from '../controllers/roomController';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity])], // Import de l'entité RoomEntity
  controllers: [RoomController], // Déclaration du contrôleur
  providers: [RoomService], // Déclaration du service
})
export class RoomsModule {}
