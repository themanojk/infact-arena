import { Injectable, Logger } from '@nestjs/common';
import { CreateSportDto } from './sports.dto';
import { SportsRepo } from './sports.repo';
import { Sports } from './sports.model';

@Injectable()
export class SportsService {
    constructor (private readonly sportRepo: SportsRepo, private readonly loggerService: Logger){}

    async createSports(data: CreateSportDto): Promise<Sports | Error> {
        try {
            const sport = await this.sportRepo.createSport(data);
            return sport;
        } catch (err) {
            this.loggerService.error(`Error while creating sport with body ${JSON.stringify(data)}`, err)
            return err;
        }
    }

    async getSportsByName(name: string): Promise<Sports | Error>  {
        try {
            const sport = await this.sportRepo.getByName(name);
            return sport;
        } catch (err) {
            this.loggerService.error(`Error while creating sport with name ${name}`, err)
            return err;
        }
    }

    async getAllSports(): Promise<Sports[] | Error>  {
        try {
            const sports = await this.sportRepo.findActiveSports();
            return sports;
        } catch (err) {
            this.loggerService.error(`Error while creating sport with name ${name}`, err)
            return err;
        }
    }
}
