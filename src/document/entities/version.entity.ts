import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Document } from 'src/document/entities/document.entity';

@Entity()
@ObjectType()
export class Version {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field((type) => Int)
  id_user: number;

  @Column()
  @Field()
  timestamp: string;

  @Column()
  @Field()
  version: string;

  @OneToOne(() => Document, (document) => document.version)
  @Field(() => Document)
  document: Document;

  @OneToOne(() => Document, (document) => document.version)
  @Field(() => Document)
  document_old: Document;
}
