import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Requirement {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
