import type { Knex } from "knex";
import { DbConstants } from "../libs/common/constants/db.constants";
import { KnexOrmService } from "../libs/knex-orm/src/knex-orm.service";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.withSchema(DbConstants.SCHEMA_NAME).createTable(DbConstants.TABLES.ARTICLES, (table) => {
        KnexOrmService.baseSchemaBuilderQuery(table, knex);
        table.string('title', 1000).notNullable();
        table.string('content', 5000).notNullable();
        table.string('description', 10000).nullable();
        table.uuid('sport_id').notNullable();
        table.uuid('category_id').notNullable();
        table.json('author').nullable();
        table.foreign('category_id').references('id').inTable(DbConstants.TABLES.CATEGORIES);
        table.foreign('sport_id').references('id').inTable(DbConstants.TABLES.SPORTS);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.withSchema('public').dropTableIfExists(DbConstants.TABLES.ARTICLES)
}

