import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class EditCampoDto{
    @IsNotEmpty()
    @Field(()=>Int)
    id:number;

    @IsOptional()
    @Field(()=>String)     
    title:string;

    @IsOptional()
    @Field(()=>String)
    cuerpo:string

}