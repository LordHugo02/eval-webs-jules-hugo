import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateReservationInput {
  @Field({ nullable: true })
  user_id?: string;

  @Field({ nullable: true })
  room_id?: string;

  @Field({ nullable: true })
  start_time?: Date;

  @Field({ nullable: true })
  end_time?: Date;

  @Field({ nullable: true })
  status?: string;
}
