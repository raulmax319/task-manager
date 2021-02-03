import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from 'nestjs-dotenv';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './Entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserRepository } from './Repositories/user.repository';

const configService = new ConfigService('./config/default.env');
const jwtConfig = configService.getWithType('jwt', 'object').secret;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || jwtConfig,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
