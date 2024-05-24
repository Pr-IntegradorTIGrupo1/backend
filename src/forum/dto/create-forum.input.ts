import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateForumInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
