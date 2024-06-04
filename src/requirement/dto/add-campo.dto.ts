import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class AddCampoDto{
    @IsNotEmpty()
    @Field(() =>Int)
    id_requisito:number;

    @IsNotEmpty()
    @Field(() => String)
    title:string;

    @IsNotEmpty()
    @Field(() => String)
    cuerpo:string;

}
