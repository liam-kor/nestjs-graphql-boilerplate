import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.model';

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async findOneById(id: number): Promise<User> {
    return await this.users.findOne(id);
  }

  async getUsers(): Promise<User[]> {
    return await this.users.find();
  }
}
