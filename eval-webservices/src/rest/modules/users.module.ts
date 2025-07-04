import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from '../services/userService';
import { UserController } from '../controllers/userController';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],

  controllers: [UserController], // Déclaration du contrôleur
  providers: [UserService], // Déclaration du service
})
export class UsersModule {}
