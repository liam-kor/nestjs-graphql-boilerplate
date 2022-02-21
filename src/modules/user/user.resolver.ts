import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from '../post/models/post.model';
import { PostService } from '../post/post.service';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private postService: PostService,
  ) {}

  @Query(() => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.findOneById(id);
  }

  @ResolveField()
  async posts(@Parent() user: User): Promise<Post[]> {
    return await this.postService.findByUser(user);
  }
}
