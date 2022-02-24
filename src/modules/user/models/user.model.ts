import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from '@src/modules/post/models/post.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ length: 20 })
  @Field()
  name: string;

  @Field((type) => [Post])
  @OneToMany((type) => Post, (post) => post.author)
  posts?: Post[];
}
