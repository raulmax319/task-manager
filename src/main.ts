import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from 'nestjs-dotenv';
import { AppModule } from './app.module';

//default.env for development mode
//production.env for production
const path = './config/production.env';

const configService = new ConfigService(path).getWithType('port', 'number');

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') app.enableCors();
  else app.enableCors({ origin: process.env.END_POINT });

  const PORT = process.env.PORT || configService.port;
  await app.listen(PORT);
  logger.log(`Application listening on port ${PORT}`);
}
bootstrap();
