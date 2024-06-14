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
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Forum } from 'src/forum/entities/forum.entity';
import { Template } from './template.entity';
import { Version } from './version.entity';
import { Requirement } from 'src/requirement/entities/requirement.entity';

@Entity()
@ObjectType()
export class Document {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  id_user: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  timestamp: string;

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
