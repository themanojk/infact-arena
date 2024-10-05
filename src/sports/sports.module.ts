import { Logger, Module } from '@nestjs/common';
import { SportsService } from './sports.service';
import { SportsRepo } from './sports.repo';
import { CommonService } from 'libs/common/common.service';

@Module({
  providers: [SportsService, SportsRepo, Logger, CommonService],
  exports: [SportsService, SportsRepo]
})
export class SportsModule {}
