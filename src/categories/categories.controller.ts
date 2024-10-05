import { Controller, Get, Logger, Post, Body, Res, Param } from '@nestjs/common';
import { CommonService } from 'libs/common/common.service';
import { CategoriesService } from './categories.service';
import { Response } from 'express';

@Controller({
    version: '1',
    path: 'categories'
})
export class CategoriesController {
    constructor(
        private readonly service: CategoriesService,
        private readonly commonService: CommonService,
        private readonly loggerService: Logger
    ) {}

    @Post() 
    async create(
        @Body() body: any,
        @Res() res: Response
    ) {
        try {
            const data = await this.service.createCategory(body);
            this.commonService.successHandler(res, data); 
        } catch(err) {
            this.loggerService.error(
                'createCategory',
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

    @Get('/:sportId')
    async getCategoryBySportId(
        @Param('sportId') sportId: string, @Res() res: Response
    ) {
        try {
            const data = await this.service.getCategoriesBySportId(sportId);
            this.commonService.successHandler(res, data); 
        } catch(err) {
            this.loggerService.error(
                'getCategoryBySportId',
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
    async getAllCategories(@Res() res: Response){
        try {
            const data = await this.service.getAllCategories();
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
