import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Unique,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Document } from 'src/document/entities/document.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
@ObjectType()
export class Version {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  timestamp: string;

  @Column()
  @Field(() => Int)
  version: number;

  @Column()
  @Field()
  last_version: boolean;

  @ManyToOne(() => User, (user) => user.versions)
  @Field(() => User)
  user: User;

  @OneToOne(() => Document, (document) => document.version)
  @Field(() => Document)
  @JoinColumn()
  document: Document;
}
