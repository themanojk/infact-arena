import { Injectable, Logger } from '@nestjs/common';
import { CategoriesRepo } from './categories.repo';
import { CreateCategoryDto } from './categories.dto';
import { Categories } from './categories.model';

@Injectable()
export class CategoriesService {
    constructor (private readonly categoryRepo: CategoriesRepo, private readonly loggerService: Logger){}

    async createCategory(data: CreateCategoryDto): Promise<Categories | Error> {
        try {
            const sport = await this.categoryRepo.createCategory(data);
            return sport;
        } catch (err) {
            this.loggerService.error(`Error while creating category with body ${JSON.stringify(data)}`, err)
            return err;
        }
    }

    async getCategoriesBySportId(sportId: string): Promise<Categories[] | Error>  {
        try {
            const categories = await this.categoryRepo.getBySportId(sportId);
            return categories;
        } catch (err) {
            this.loggerService.error(`Error while getting category by sport Id ${sportId}`, err)
            return err;
        }
    }

    async getAllCategories(): Promise<Categories[] | Error>  {
        try {
            const categories = await this.categoryRepo.findActiveCategories();
            return categories;
        } catch (err) {
            this.loggerService.error(`Error while creating sport with name ${name}`, err)
            return err;
        }
    }
}
