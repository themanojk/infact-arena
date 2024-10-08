import { Injectable } from "@nestjs/common";
import { KnexOrmService } from "libs/knex-orm/src/knex-orm.service";

import { Articles } from "./article.model";
import { CreateArticleDto } from "./article.dto";

@Injectable()
export class ArticlesRepo {
    constructor(private readonly knexOrm: KnexOrmService){}

    get repo(){
        return Articles.query(this.knexOrm.knex)
    }

    async create(data: CreateArticleDto): Promise<Articles | Error>{
        try {
            return await this.repo.insert(data);
        } catch(err) {
            throw err
        }
    }

    async getById(id: string): Promise<Articles | Error> {
        try {
            return await this.repo.findById(id);
        } catch(err) {
            throw err;
        }
    }

    async getBySportId(sportId: string): Promise<Articles[] | Error> {
        try {
            return await this.repo.select('*').where('sport_id', sportId);
        } catch(err) {
            throw err;
        }
    }

    async getByCategoryId(categoryId: string): Promise<Articles[] | Error> {
        try {
            return await this.repo.select('*').where('category_id', categoryId);
        } catch(err) {
            throw err;
        }
    }

    async findActiveRecords(): Promise<Articles[] | Error> {
        try {
            return await this.repo.select('*').where('is_active', true);
        } catch(err) {
            throw err;
        }
    }

    async updateArticle(articleId: string, data: Partial<Articles>): Promise<Articles | Error> {
        try {
            return await this.repo.updateAndFetchById(articleId, data);
        } catch(err) {
            throw err;
        }
    }
}