import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Forum } from 'src/forum/entities/forum.entity';

@ObjectType()
export class Document {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @OneToOne(()=> Forum, forum => forum.document)
  @Field((type)=>Forum)
  forum: Forum;
}
