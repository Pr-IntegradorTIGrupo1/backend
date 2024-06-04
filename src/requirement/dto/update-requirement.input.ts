import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateRequirementInput } from './create-requirement.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRequirementInput extends PartialType(CreateRequirementInput) {
  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @IsOptional()
  @Field(()=>String,{nullable:true})
  title?: string;

  @IsOptional()
  @Field(()=>Boolean, {nullable:true})
  status?: boolean;
}
