import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const serverConfig: number = config.get('server.port');

  if (process.env.NODE_ENV === 'development') app.enableCors();
  else app.enableCors({ origin: process.env.END_POINT });

  const PORT = process.env.PORT || serverConfig;
  await app.listen(PORT);
  logger.log(`Application listening on port ${PORT}`);
}
bootstrap();
