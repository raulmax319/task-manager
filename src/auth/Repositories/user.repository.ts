import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { User } from '../Entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createAccount(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, email, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

    console.log('account creation was successful.');

    await user.save();
  }
}
