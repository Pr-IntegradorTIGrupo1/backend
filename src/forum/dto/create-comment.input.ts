import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @IsNotEmpty()
  @Field()
  content: string;

  @IsNotEmpty()
  @Field(() => Int)
  id_user: number;

  @IsNotEmpty()
  @Field(() => Int)
  id_forum: number;
}
