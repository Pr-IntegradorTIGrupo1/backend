import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class UpdateDocumentInput {
  @IsNotEmpty()
  @Field(() => Int)
  id_document: number;

  @IsNotEmpty()
  @Field(() => Int)
  id_user: number;

  @IsNotEmpty()
  @Field()
  title: string;

  @IsNotEmpty()
  @Field()
  content: string;

  @IsNotEmpty()
  @Field(() => Int)
  id_template: number;
}
