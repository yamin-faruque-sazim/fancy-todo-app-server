import { MikroORM } from '@mikro-orm/core';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import mikroOrmConfig from './mikro-orm.config';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await MikroORM.init(mikroOrmConfig);
  await app.listen(3000);
}
bootstrap();
