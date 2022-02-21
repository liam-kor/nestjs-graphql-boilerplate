import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post/models/post.model';
import { PostService } from '../post/post.service';
import { User } from './models/user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  providers: [UserService, UserResolver, PostService],
})
export class UserModule {}
