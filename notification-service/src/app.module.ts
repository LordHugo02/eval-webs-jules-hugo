import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './notifications/notification.controller';
import { NotificationEntity } from './notifications/notification.entity';
import { NotificationService } from './notifications/notification.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'pguser',
      password: 'pgpass',
      database: 'pgdb',
      entities: [NotificationEntity], //mettre les entities
      synchronize: true, // false si vous avez déjà les tables
    }),
    TypeOrmModule.forFeature([NotificationEntity]), //mettre les entities
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class AppModule {}
