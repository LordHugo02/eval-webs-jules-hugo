import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserResolver } from './graphql/resolvers/user.resolver';
import { RoomResolver } from './graphql/resolvers/room.resolver';
import { ReservationResolver } from './graphql/resolvers/reservation.resolver';
import { UserEntity } from './entities/user.entity';
import { RoomEntity } from './entities/room.entity';
import { ReservationsEntity } from './entities/reservation.entity';

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
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver, RoomResolver, ReservationResolver],
})
export class AppModule {}
