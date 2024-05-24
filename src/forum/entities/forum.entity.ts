import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Coment } from './coment.entity';

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
  
  @OneToMany(() => Coment, coment => coment.forum)
  @Field(()=>[Coment])
  coments: Coment[];

}
