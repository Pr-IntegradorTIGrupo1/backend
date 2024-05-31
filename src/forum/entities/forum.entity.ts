import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Document } from 'src/document/entities/document.entity';

@Entity()
@ObjectType()
export class Forum {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  content: string;

  @Column()
  @Field()
  status: string;

  @OneToMany(() => Comment, (comment) => comment.forum)
  @Field(() => [Comment])
  coments: Comment[];

  @ManyToOne(() => Document, (document) => document.forums)
  @Field(() => Document)
  document: Document;
}
