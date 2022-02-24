import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '@src/modules/user/models/user.model';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  @IsNumber()
  id: number;

  @Column({ length: 10 })
  @Field()
  @MaxLength(10)
  title: string;

  @Column({ type: 'text' })
  @Field()
  @IsString()
  content: string;

  @ManyToOne((type) => User, (user) => user.posts)
  author?: User;
}
