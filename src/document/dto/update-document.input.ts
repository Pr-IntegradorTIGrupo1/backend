import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class UpdateDocumentInput {
  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @Field(()=>Int)
  id_user:number;


  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  content: string;

  @Field(() => Int, { nullable: true })
  id_template: number;
}
