import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Document {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;
}
