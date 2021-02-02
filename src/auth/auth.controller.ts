import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from './Entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/user')
  async signUp(
    @Body(ValidationPipe)
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.createAccount(authCredentialsDto);
  }

  @Post('/signIn')
  async signIn(
    @Body(ValidationPipe)
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<unknown> {
    return await this.authService.validateUser(authCredentialsDto);
  }
}
