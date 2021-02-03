import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from 'nestjs-dotenv';
import { AppModule } from './app.module';

const configService = new ConfigService('./config/default.env').getWithType(
  'port',
  'number',
);

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || configService.port;
  await app.listen(PORT);
  logger.log(`Application listening on port ${PORT}`);
}
bootstrap();
