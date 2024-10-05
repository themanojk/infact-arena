import { Injectable } from "@nestjs/common";
import { KnexOrmService } from "libs/knex-orm/src/knex-orm.service";

import { Categories } from "./categories.model";
import { CreateCategoryDto } from "./categories.dto";

@Injectable()
export class CategoriesRepo {
    constructor(private readonly knexOrm: KnexOrmService){}

    get categories(){
        return Categories.query(this.knexOrm.knex)
    }

    async createCategory(categoryDto: CreateCategoryDto): Promise<Categories | Error>{
        try {
            return await this.categories.insert(categoryDto);
        } catch(err) {
            throw err
        }
    }

    async getById(id: string): Promise<Categories | Error> {
        try {
            return await this.categories.findById(id);
        } catch(err) {
            throw err;
        }
    }

    async getBySportId(sportId: string): Promise<Categories[] | Error> {
        try {
            return await this.categories.select('*').where('sport_id', sportId);
        } catch(err) {
            throw err;
        }
    }

    async findActiveCategories(): Promise<Categories[] | Error> {
        try {
            return await this.categories.select('*');
        } catch(err) {
            throw err;
        }
    }

    async getByName(name: string): Promise<Categories | Error> {
        try {
            return await this.categories.findOne({name});
        } catch(err) {
            throw err;
        }
    }

    async updateSport(categoryId: string, data: Partial<Categories>): Promise<Categories | Error> {
        try {
            return await this.categories.updateAndFetchById(categoryId, data);
        } catch(err) {
            throw err;
        }
    }
}