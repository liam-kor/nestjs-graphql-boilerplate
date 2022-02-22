import { InputType, OmitType } from '@nestjs/graphql';
import { Post } from '../models/post.model';

@InputType()
export class CreatePostInput extends OmitType(Post, ['id', 'author']) {}
