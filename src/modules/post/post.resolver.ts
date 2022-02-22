import { Inject } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Post } from '../post/models/post.model';
import { PostService } from '../post/post.service';
import { CreatePostInput } from './dto/create-post.dto';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private postService: PostService,
    @Inject('PUB_SUB') private readonly pubsub: PubSub,
  ) {}

  @Mutation(() => Post)
  async createPost(@Args('inputs') inputs: CreatePostInput): Promise<Post> {
    const createdPost = await this.postService.createPost(inputs);
    this.pubsub.publish('postAdded', { postAdded: createdPost });
    return createdPost;
  }

  @Subscription((returns) => Post)
  postAdded() {
    return this.pubsub.asyncIterator('postAdded');
  }
}
