import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Document } from 'src/document/entities/document.entity';

@Entity()
@ObjectType()
export class Template {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  format: string;

  @OneToOne(() => Document, (document) => document.template)
  @Field(() => Document)
  document: Document;
}
