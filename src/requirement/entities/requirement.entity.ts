import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Document } from '../../document/entities/document.entity';

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
}
