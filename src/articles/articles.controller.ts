import { Controller, Logger, Post, Body, Res, Get, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CommonService } from 'libs/common/common.service';
import { CreateArticleDto } from './article.dto';
import { Response } from 'express';

@Controller({
    version: '1',
    path: 'articles'
})
export class ArticlesController {
    constructor(
        private readonly service: ArticlesService,
        private readonly commonService: CommonService,
        private readonly loggerService: Logger
    ) {}

    @Post()
    async create(
        @Body() body: CreateArticleDto,
        @Res() res: Response
    ) {
        try {
            const data = await this.service.create(body);
            this.commonService.successHandler(res, data); 
        } catch(err) {
            this.loggerService.error(
                'createArticle',
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

    @Get('/sportId/:sportId')
    async getArticleBySportId(
        @Param('sportId') sportId: string, @Res() res: Response
    ) {
        try {
            const data = await this.service.getArticlesBySportId(sportId);
            this.commonService.successHandler(res, data); 
        } catch(err) {
            this.loggerService.error(
                'getArticleBySportId',
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

    @Get('/categoryId/:categoryId')
    async getArticleByCategoryId(
        @Param('categoryId') categoryId: string, @Res() res: Response
    ) {
        try {
            const data = await this.service.getArticlesByCategoryId(categoryId);
            this.commonService.successHandler(res, data); 
        } catch(err) {
            this.loggerService.error(
                'getArticleByCategoryId',
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
    async getAllItems(@Res() res: Response){
        try {
            const data = await this.service.getAllArticles();
            this.commonService.successHandler(res, data); 
        } catch(err) {
            this.loggerService.error(
                'getAllItems',
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
