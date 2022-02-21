import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/models/user.model';
import { Post } from './models/post.model';

export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly posts: Repository<Post>,
  ) {}
  async findByUser(user: User): Promise<Post[]> {
    return await this.posts.find({
      where: {
        author: user,
      },
    });
  }
}
