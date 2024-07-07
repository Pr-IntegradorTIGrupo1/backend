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
import { User } from 'src/user/entities/user.entity';

@Entity()
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => User, (user) => user.projects)
  @Field(() => [User])
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
