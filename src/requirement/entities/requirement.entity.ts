import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Document } from '../../document/entities/document.entity';

@Entity()
@ObjectType()
export class Requirement {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  content: string;

  @Column()
  @Field(() => Boolean)
  status: boolean;

  @ManyToOne(() => Document, (document) => document.requirements)
  @Field(() => Document)
  @JoinColumn()
  document: Document;
}
