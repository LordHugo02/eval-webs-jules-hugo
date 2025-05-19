import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { KeycloakService } from '../rest/services/keycloak.service';
import { MinioService } from '../rest/services/minio.service';
import { ReservationService } from '../rest/services/reservationServices';
import { RoomService } from '../rest/services/roomService';
import { UserService } from '../rest/services/userService';
import { ReservationResolver } from './resolvers/reservation.resolver';
import { RoomResolver } from './resolvers/room.resolver';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
  ],
  providers: [
    RoomResolver,
    ReservationResolver,
    UserResolver,
    RoomService,
    ReservationService,
    UserService,
    KeycloakService,
    MinioService,
  ],
})
export class AppGraphQLModule {}
