import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from 'src/entities/room.entity';
import { RoomService } from '../services/roomService';
import { RoomController } from '../controllers/roomController';
import { AuthModule } from 'src/auth/auth.module'; // <-- Ajoute cette ligne

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity]), AuthModule],

  controllers: [RoomController], // Déclaration du contrôleur
  providers: [RoomService], // Déclaration du service
})
export class RoomsModule {}
