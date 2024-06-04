import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Requirement } from "./requirement.entity";

@Entity()
@ObjectType()
export class Campo{
    @PrimaryGeneratedColumn()
    @Field(()=>Int)
    id:number;

    @Column()
    @Field({description:'titulo del campo'})
    title:string;

    @Column()
    @Field({description:'cuerpo del campo'})
    cuerpo:string;

    @ManyToOne(()=>Requirement, (requirement)=>requirement.campos)
    @Field(()=>Requirement)
    @JoinColumn({ name: 'id_requirement', referencedColumnName: 'id' })
    requirement:Requirement;
    
}