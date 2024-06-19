import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTemplateInput {
  @IsNotEmpty()
  @Field()
  title: string;

  @IsNotEmpty()
  @Field()
  format: string;
}
