import { EntityRepository, Repository } from 'typeorm';
import { User } from '../Entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
