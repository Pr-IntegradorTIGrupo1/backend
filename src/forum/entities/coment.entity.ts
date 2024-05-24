import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Forum } from "./forum.entity";

@Entity()
@ObjectType()
export class Coment{
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;
    
    @Column()
    @Field()
    content: string;  

    @Column()
    @Field((type) => Int)
    id_user: number;

    @OneToOne(()=>Forum, forum => forum.coments)
    forum: Forum;
}