import { Global, Module } from '@nestjs/common';
import { KnexOrmService } from './knex-orm.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [KnexOrmService],
  exports: [KnexOrmService],
})
export class KnexOrmModule {}
