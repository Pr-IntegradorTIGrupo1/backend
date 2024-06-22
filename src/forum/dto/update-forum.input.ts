import { IsNotEmpty } from 'class-validator';
import { CreateForumInput } from './create-forum.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateForumInput extends PartialType(CreateForumInput) {
  @IsNotEmpty()
  @Field(() => Int)
  id: number;
  
  @IsNotEmpty()
  @Field()
  title: string;

  @Field()
  content?: string;

  @Field()
  status?: string;
}
