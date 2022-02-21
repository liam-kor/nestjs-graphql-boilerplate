import { User } from './models/user.model';

export class UserService {
  findOneById(id: number): User {
    return {
      id: 1,
      name: 'user1',
    };
  }
}
