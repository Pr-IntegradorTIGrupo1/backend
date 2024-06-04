import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Document } from '../../document/entities/document.entity';
import { Campo } from './campo.entity';

@Entity()
@ObjectType()
export class Requirement {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field((type) => Boolean)
  status: boolean;

  @ManyToMany(() => Document, (document) => document.requirements)
  @Field(() => [Document])
  documents: Document[];
    
  //cascade true por si se elimina el requisito se eliminen sus campos
  @OneToMany(() => Campo, campo => campo.requirement,{cascade:true})
  @Field(() => [Campo])
  campos: Campo[];
}
