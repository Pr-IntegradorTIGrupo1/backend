import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Unique,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Document } from 'src/document/entities/document.entity';

@Entity()
@ObjectType()
export class Version {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  id_user: number;

  @Column()
  @Field()
  timestamp: string;

  @Column()
  @Field()
  version: number;

  @OneToOne(() => Document, (document) => document.version)
  @Field(() => Document)
  document: Document;

  @OneToOne(() => Document, (document) => document.version)
  @Field(() => Document)
  document_old: Document;
}
