import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Unique,
  JoinColumn,
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

  @Column()
  @Field()
  last_version: boolean;

  @OneToOne(() => Document, (document) => document.version)
  @Field(() => Document)
  @JoinColumn()
  document: Document;
}
