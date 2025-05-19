import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  keycloakId: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  email?: string;
}
