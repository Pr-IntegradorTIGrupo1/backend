import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Forum } from 'src/forum/entities/forum.entity';
import { Template } from './template.entity';
import { Version } from './version.entity';
import { Requirement } from 'src/requirement/entities/requirement.entity';
import { User } from 'src/user/entities/user.entity';
import { Project } from 'src/project/entities/project.entity';

@Entity()
@ObjectType()
@Unique(['title', 'projectId'])
export class Document {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  id_document: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  timestamp: string;

  @Column()
  @Field()
  read_only: boolean;

  @Column()
  @Field()
  is_active: boolean;

  @ManyToOne(() => User, (user) => user.documents)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Project, (project) => project.documents)
  @Field(() => Project)
  project: Project;

  @OneToMany(() => Forum, (forum) => forum.document)
  @Field(() => [Forum])
  forums: Forum[];

  @ManyToOne(() => Template, (template) => template.documents)
  @Field(() => Template)
  @JoinColumn()
  template: Template;

  @OneToOne(() => Version, (version) => version.document)
  @Field(() => Version)
  version: Version;

  @OneToMany(() => Requirement, (requirement) => requirement.document)
  @Field(() => [Requirement])
  requirements: Requirement[];
}

@ObjectType()
export class DocumentResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
