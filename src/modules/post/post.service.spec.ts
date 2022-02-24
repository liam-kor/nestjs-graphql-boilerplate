import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './models/post.model';
import { PostService } from './post.service';

const mockPostRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  softDelete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('PostService', () => {
  let service: PostService;
  let postRepository: MockRepository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository(),
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    postRepository = module.get<MockRepository<Post>>(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPost', () => {
    const createPostInput = {
      title: '제목',
      content: '내용',
    };
    it('should fail on exception', async () => {
      postRepository.save.mockRejectedValue(new Error('database error'));
      expect(service.createPost(createPostInput)).rejects.toThrow(
        'database error',
      );
    });
    it('should success create post', async () => {
      const createdPost = {
        id: 1,
        ...createPostInput,
      };
      postRepository.save.mockResolvedValue(createdPost);
      expect(await service.createPost(createPostInput)).toBe(createdPost);
    });
  });
});
