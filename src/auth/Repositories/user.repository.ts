import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
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
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

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
  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { username, email, password } = authCredentialsDto;

    const user = await this.findOne({ username });

    // eslint-disable-next-line prettier/prettier
    if (user && await user.validatePassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }
}
