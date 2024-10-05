import { BaseModel } from "libs/common/models/base-model/base-model";
import { Model } from "objection";
import { Sports } from "src/sports/sports.model";

export class Categories extends BaseModel {
    category_name: string;
    sport_id: string;
    parent_id: string;
    category_description: string;

    static get relationMappings(){
        return {
            sport: {
                relation: Model.BelongsToOneRelation,
                modelClass: Sports,
                join: {
                    from: "categories.sport_id",
                    to: "sports.id"
                }
            }
        }
    }
}