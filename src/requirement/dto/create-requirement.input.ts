import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRequirementInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
