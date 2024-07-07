import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Forum } from './forum.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  content: string;

  @Column()
  @Field(() => Int)
  id_user: number;

  @ManyToOne(() => User, (user) => user.comments)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Forum, (forum) => forum.comments)
  @Field(() => Forum)
  forum: Forum;
}
