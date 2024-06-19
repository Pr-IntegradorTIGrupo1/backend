import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Document } from 'src/document/entities/document.entity';

@Entity()
@ObjectType()
export class Template {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  format: string;

  @OneToMany(() => Document, (document) => document.template)
  @Field(() => [Document])
  documents: Document[];
}
