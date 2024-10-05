import { Body, Controller, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { SportsService } from './sports.service';
import { CommonService } from 'libs/common/common.service';
import { Response } from 'express';
import { CreateSportDto } from './sports.dto';

@Controller({
    version: '1',
    path: 'sports'
})
export class SportsController {
    constructor(
        private readonly service: SportsService,
        private readonly commonService: CommonService,
        private readonly loggerService: Logger
    ) {}

    @Post()
    async createSport(
        @Body() body: CreateSportDto,
        @Res() res: Response
    ) {
        try {
            const data = await this.service.createSports(body);
            this.commonService.successHandler(res, data); 
        } catch(err) {
            this.loggerService.error(
                'createSport',
                2,
                err,
              );
        
              return this.commonService.errorHandler(
                res,
                err.statusCode || 500,
                err.message || 'Something went wrong',
                err,
              );
        }
    }

    @Get('/:name')
    async getSport(
        @Param('name') name: string, @Res() res: Response
    ) {
        try {
            const data = await this.service.getSportsByName(name);
            this.commonService.successHandler(res, data); 
        } catch(err) {
            this.loggerService.error(
                'getSportByName',
                2,
                err,
              );
        
              return this.commonService.errorHandler(
                res,
                err.statusCode || 500,
                err.message || 'Something went wrong',
                err,
              );
        }
    }

    @Get('/')
    async getAllSport(@Res() res: Response){
        try {
            const data = await this.service.getAllSports();
            this.commonService.successHandler(res, data); 
        } catch(err) {
            this.loggerService.error(
                'getSportByName',
                2,
                err,
              );
        
              return this.commonService.errorHandler(
                res,
                err.statusCode || 500,
                err.message || 'Something went wrong',
                err,
              );
        }
    }
}
