import { BaseModel } from "libs/common/models/base-model/base-model";
import { Model } from "objection";
import { Categories } from "src/categories/categories.model";
import { Sports } from "src/sports/sports.model";

export class Articles extends BaseModel {
    title: string;
    content: string;
    description: string;
    category_id: string;
    sport_id: string;
    author: object;

    static get relationMappings(){
        return {
            sport: {
                relation: Model.BelongsToOneRelation,
                modelClass: Sports,
                join: {
                    from: "articles.sport_id",
                    to: "sports.id"
                }
            },
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Categories,
                join: {
                    from: "articles.category_id",
                    to: "categories.id"
                }
            }
        }
    }
}