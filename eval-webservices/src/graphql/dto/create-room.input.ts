import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class CreateRoomInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  capacity: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  location?: string;
}
