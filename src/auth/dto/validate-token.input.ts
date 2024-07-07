import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ValidateTokenInput {
  @IsNotEmpty()
  @Field()
  token: string;
}
