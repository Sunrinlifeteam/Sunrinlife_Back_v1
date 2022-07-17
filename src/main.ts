import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  await app.listen(config.get<number>('PORT'));
  Logger.log(
    `Server running on http://localhost:${config.get<number>('PORT')}`,
    'Bootstrap',
  );
}
bootstrap();
