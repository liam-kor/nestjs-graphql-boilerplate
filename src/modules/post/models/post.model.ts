import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/models/user.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ length: 255 })
  @Field()
  title?: string;

  @Column({ type: 'text' })
  @Field()
  content?: string;

  @ManyToOne((type) => User, (user) => user.posts)
  author?: User;
}
