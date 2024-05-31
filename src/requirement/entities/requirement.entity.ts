import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Document } from 'src/document/entities/document.entity';

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
  @JoinTable({ name: 'requirement_document' })
  @Field(() => [Document])
  documents: Document[];
}
