import { Injectable } from "@nestjs/common";
import { KnexOrmService } from "libs/knex-orm/src/knex-orm.service";

import { Sports } from "./sports.model";
import { CreateSportDto } from "./sports.dto";

@Injectable()
export class SportsRepo {
    constructor(private readonly knexOrm: KnexOrmService){}

    get sports(){
        return Sports.query(this.knexOrm.knex)
    }

    async createSport(sportDto: CreateSportDto): Promise<Sports | Error>{
        try {
            return await this.sports.insert(sportDto);
        } catch(err) {
            throw err
        }
    }

    async getById(id: string): Promise<Sports | Error> {
        try {
            return await this.sports.findById(id);
        } catch(err) {
            throw err;
        }
    }

    async findActiveSports(): Promise<Sports[] | Error> {
        try {
            return await this.sports.select('*');
        } catch(err) {
            throw err;
        }
    }

    async getByName(name: string): Promise<Sports | Error> {
        try {
            return await this.sports.findOne({name});
        } catch(err) {
            throw err;
        }
    }

    async updateSport(sportId: string, data: Partial<Sports>): Promise<Sports | Error> {
        try {
            return await this.sports.updateAndFetchById(sportId, data);
        } catch(err) {
            throw err;
        }
    }
}