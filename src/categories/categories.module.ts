import { Logger, Module } from '@nestjs/common';
import { CategoriesRepo } from './categories.repo';
import { CommonService } from 'libs/common/common.service';
import { CategoriesService } from './categories.service';

@Module({
    providers: [CategoriesService,CategoriesRepo, Logger, CommonService],
    exports: [CategoriesService, CategoriesRepo]
})
export class CategoriesModule {}
