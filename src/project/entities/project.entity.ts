import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Document } from '../../document/entities/document.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
@ObjectType()
@Unique(['name'])
export class Project {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => User, (user) => user.projects)
  @Field(() => [User])
  @JoinTable({ name: 'project_user' })
  users: User[];

  @OneToMany(() => Document, (document) => document.project)
  @Field(() => [Document])
  documents: Document[];
}

@ObjectType()
export class ProjectResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
