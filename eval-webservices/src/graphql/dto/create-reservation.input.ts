import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateReservationInput {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @Field()
  @IsDate()
  startTime: Date;

  @Field()
  @IsDate()
  endTime: Date;
}
