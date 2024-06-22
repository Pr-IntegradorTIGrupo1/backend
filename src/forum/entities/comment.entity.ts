import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Forum } from './forum.entity';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  content: string;

  @Column()
  @Field((type) => Int)
  id_user: number;

  @ManyToOne(() => Forum, (forum) => forum.comments)
  @Field(() => Forum)
  forum: Forum;
}
