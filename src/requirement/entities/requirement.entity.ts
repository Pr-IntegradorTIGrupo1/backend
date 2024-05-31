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
  content: string;

  @Column()
  @Field((type) => Boolean)
  status: boolean;

  @ManyToMany(() => Document, (document) => document.requirements)
  @Field(() => [Document])
  documents: Document[];
    
  @OneToMany(() => Campo, campo => campo.requirement)
  @Field(() => [Campo])
  campos: Campo[];
}
