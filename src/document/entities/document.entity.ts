import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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
  @Field((type) => Int)
  id: number;

  @Column()
  @Field((type) => Int)
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

  @OneToOne(() => Template, (template) => template.document)
  @Field(() => Template)
  template: Template;

  @OneToOne(() => Version, (version) => version.document)
  @Field(() => Version)
  version: Version;

  @ManyToMany(() => Requirement, (requirement) => requirement.documents)
  @Field(() => [Requirement])
  @JoinTable()
  requirements: Requirement[];
}
