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
  async createAccount(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ username: string; date: string }> {
    const { username, password } = authCredentialsDto;
    const date = new Date().toLocaleDateString();

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.creationDate = date;

    try {
      await user.save();
      console.log('account creation was successful.');
      return { username: user.username, date: user.creationDate };
    } catch (err) {
      const [detail] = err.detail.split(' ').splice(1);
      // eslint-disable-next-line prefer-const
      let [key, name] = detail.split('=');
      //not using key Email right now as i removed email column
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
    const { username, password } = authCredentialsDto;

    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }
}
