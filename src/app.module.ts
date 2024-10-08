import { Module, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { KnexOrmModule } from 'libs/knex-orm/src/knex-orm.module';
import { CommonModule } from 'libs/common/common.module';
import { KnexOrmService } from 'libs/knex-orm/src/knex-orm.service';
import { SportsController } from './sports/sports.controller';
import { SportsModule } from './sports/sports.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KnexOrmModule,
    CommonModule,
    SportsModule,
    CategoriesModule,
    ArticlesModule
  ],
  controllers: [AppController, SportsController, CategoriesController, ArticlesController],
  providers: [AppService, Logger, CategoriesService, ArticlesService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly knexOrm: KnexOrmService,
    private readonly loggerService: Logger,
  ) {}

  onApplicationBootstrap() {
    exec('npm run migrate:latest', (err, sdt, sde) => {
      this.loggerService.debug(`Migration's completed`);

      if (err) this.loggerService.error('migration has failed', err);
      if (sdt) this.loggerService.debug('logs', sdt);
      if (sde) this.loggerService.debug('error logs', sde);

      if (!err) {
        this.knexOrm.initializeModels([]);
      }
    });
  }
}
