import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class CreateForumInput {
  @IsNotEmpty()
  @Field()
  title: string;

  @IsNotEmpty()
  @Field()
  content: string;

  @IsNotEmpty()
  @Field(()=>Int)
  id_document: number;

  @IsNotEmpty()
  @Field(()=>Int)
  id_user: number;  
  
  @Field()
  status:string;
}
