import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import helmet from 'helmet'
import { ConfigService } from '@nestjs/config';
import { AllExceptionFilterFilter } from 'libs/common/filters/all-exception-filter/all-exception-filter.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console
  });

  const config = app.get<ConfigService>(ConfigService);

  app.enableCors();

  app.use(helmet());

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalFilters(new AllExceptionFilterFilter());
  await app.listen(config.get('PORT'));
}
bootstrap();
