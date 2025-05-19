import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Reservation {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  roomId: string;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field()
  createdAt: Date;
}
