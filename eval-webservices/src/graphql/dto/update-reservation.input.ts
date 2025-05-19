import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateReservationInput {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field(() => ID, { nullable: true })
  @IsString()
  @IsOptional()
  userId?: string;

  @Field(() => ID, { nullable: true })
  @IsString()
  @IsOptional()
  roomId?: string;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  startTime?: Date;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  endTime?: Date;
}
