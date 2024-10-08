import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ArticlesRepo } from './article.repo';
import { CreateArticleDto } from './article.dto';
import { Articles } from './article.model';
import { CategoriesRepo } from 'src/categories/categories.repo';
import { CommonService } from 'libs/common/common.service';
import { validationErrorMessages } from 'libs/common/constants/error.constants';
import { Categories } from 'src/categories/categories.model';

@Injectable()
export class ArticlesService {
    constructor (private readonly repo: ArticlesRepo, private readonly loggerService: Logger, private readonly categoryRepo: CategoriesRepo, private readonly commonService: CommonService){}
    async create(data: CreateArticleDto): Promise<Articles | Error> {
        try {
            const categoryInfo: Categories | Error = await this.categoryRepo.getById(data.category_id);
            if(!categoryInfo) {
                throw new BadRequestException(
                    this.commonService.createResponseStructure(
                      null,
                      validationErrorMessages.infa_0007,
                      'infa_0007',
                      true,
                    ),
                );
            }
            console.log(categoryInfo)
            data.sport_id = categoryInfo['sportId'];
            console.log(data)
            const article = await this.repo.create(data);
            return article;
        } catch (err) {
            this.loggerService.error(`Error while creating article with body ${JSON.stringify(data)}`, err)
            return err;
        }
    }

    async getArticlesBySportId(sportId: string): Promise<Articles[] | Error>  {
        try {
            const articles = await this.repo.getBySportId(sportId);
            return articles;
        } catch (err) {
            this.loggerService.error(`Error while getting articles by sport Id ${sportId}`, err)
            return err;
        }
    }

    async getArticlesByCategoryId(categoryId: string): Promise<Articles[] | Error>  {
        try {
            const articles = await this.repo.getByCategoryId(categoryId);
            return articles;
        } catch (err) {
            this.loggerService.error(`Error while getting articles by category Id ${categoryId}`, err)
            return err;
        }
    }

    async getAllArticles(): Promise<Articles[] | Error>  {
        try {
            const articles = await this.repo.findActiveRecords();
            return articles;
        } catch (err) {
            this.loggerService.error(`Error while getting active articles`, err)
            return err;
        }
    }
}
