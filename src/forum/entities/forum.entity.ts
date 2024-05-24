import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Forum {

  @PrimaryGeneratedColumn()
  @Field(()=>Int)
  id:number;

  @OneToOne(()=>Document, document => document.forum)
  @JoinColumn()
  @Field(()=>Document)
  document: Document;
  

}
