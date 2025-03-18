import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  @Field()
  name: string;

  @Field()
  capacity: number;

  @Field({ nullable: true })
  location?: string;
}
