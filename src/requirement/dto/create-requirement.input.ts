import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRequirementInput {

  @IsNotEmpty()
  @Field(() => String, { description: 'Título del requisito' })
  title: string;

  @IsNotEmpty()
  @Field(() => Int)
  id_document: number;

}
