import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ReservationsEntity } from './entities/reservation.entity';
import { RoomEntity } from './entities/room.entity';
import { UserEntity } from './entities/user.entity';
import { ReservationResolver } from './graphql/resolvers/reservation.resolver';
import { RoomResolver } from './graphql/resolvers/room.resolver';
import { UserResolver } from './graphql/resolvers/user.resolver';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'pguser',
      password: 'pgpass',
      database: 'pgdb',
      entities: [UserEntity, RoomEntity, ReservationsEntity], //mettre les entities
      synchronize: true, // false si vous avez déjà les tables
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
    TypeOrmModule.forFeature([UserEntity, RoomEntity, ReservationsEntity]), //mettre les entities
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver, RoomResolver, ReservationResolver],
})
export class AppModule {}
