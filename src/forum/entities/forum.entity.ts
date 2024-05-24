import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Forum {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
