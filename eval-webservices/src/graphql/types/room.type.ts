import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Room {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  capacity: number;

  @Field({ nullable: true })
  location?: string;

  @Field()
  createdAt: Date;
}
