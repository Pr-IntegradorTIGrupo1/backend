import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Document } from '../../document/entities/document.entity';

@Entity()
@ObjectType()
export class Requirement {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field((type) => Boolean)
  status: boolean;

  @ManyToOne(() => Document, (document) => document.requirements)
  @Field(() => Document)
  @JoinColumn()
  document: Document;
    
  @Column({ type: 'jsonb', nullable: true })
  @Field(() => [String])
  campos: string[];
}
