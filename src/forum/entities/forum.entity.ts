import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Document } from 'src/document/entities/document.entity';
import { Comment } from './comment.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
@ObjectType()
export class Forum {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
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

  @ManyToOne(() => User, (user) => user.forums)
  @Field(() => User)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.forum, 
  {cascade:['remove'],})
  @Field(() => [Comment])
  comments: Comment[];

  @ManyToOne(() => Document, (document) => document.forums)
  @Field(() => Document)
  document: Document;
}
