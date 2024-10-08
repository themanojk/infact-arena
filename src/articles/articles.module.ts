import { Logger, Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesRepo } from './article.repo';
import { CommonService } from 'libs/common/common.service';
import { CategoriesRepo } from 'src/categories/categories.repo';

@Module({
    imports: [],
    providers: [ArticlesService, ArticlesRepo, Logger, CommonService, CategoriesRepo],
    exports: [ArticlesService, ArticlesRepo]
})
export class ArticlesModule {}
