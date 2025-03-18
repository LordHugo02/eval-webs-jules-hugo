import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReservationInput {
  @Field()
  user_id: string;

  @Field()
  room_id: string;

  @Field()
  start_time: Date;

  @Field()
  end_time: Date;

  @Field()
  status: string;
}
