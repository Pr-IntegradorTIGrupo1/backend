import { CreateRequirementInput } from './create-requirement.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRequirementInput extends PartialType(CreateRequirementInput) {
  @Field(() => Int)
  id: number;
}
