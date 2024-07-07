import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Document } from '../../document/entities/document.entity';
import { Project } from 'src/project/entities/project.entity';
import { Version } from 'src/document/entities/version.entity';
import { Comment } from 'src/forum/entities/comment.entity';
import { Forum } from 'src/forum/entities/forum.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  rut: string;

  @ManyToMany(() => Project, (project) => project.users)
  @Field(() => [Project])
  projects: Project[];

  @OneToMany(() => Document, (document) => document.user)
  @Field(() => [Document])
  documents: Document[];

  @OneToMany(() => Version, (version) => version.user)
  @Field(() => [Version])
  versions: Version[];

  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(() => [Comment])
  comments: Comment[];

  @OneToMany(() => Forum, (forum) => forum.user)
  @Field(() => [Forum])
  forums: Forum[];
}

@ObjectType()
export class UserResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
