import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
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

    try {
      await user.save();
      console.log('account creation was successful.');
    } catch (err) {
      const [detail] = err.detail.split(' ').splice(1);
      // eslint-disable-next-line prefer-const
      let [key, name] = detail.split('=');
      key.match(/(?=.*email)/) ? (key = 'Email') : (key = 'Username');

      if (err.code === '23505')
        throw new ConflictException(`${key} ${name} already exists.`);
      else throw new InternalServerErrorException();
    }
  }
}
