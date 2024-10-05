import type { Knex } from "knex";
import { DbConstants } from "../libs/common/constants/db.constants";
import { KnexOrmService } from "../libs/knex-orm/src/knex-orm.service";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.withSchema(DbConstants.SCHEMA_NAME).createTable(DbConstants.TABLES.CATEGORIES, (table) => {
        KnexOrmService.baseSchemaBuilderQuery(table, knex);
        table.string('category_name').notNullable();
        table.string('category_description').notNullable();
        table.uuid('sport_id').notNullable();
        table.uuid('parent_id').nullable();
        table.foreign('sport_id').references('id').inTable(DbConstants.TABLES.SPORTS);
        table.foreign('parent_id').references('id').inTable(DbConstants.TABLES.CATEGORIES);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.withSchema('public').dropTableIfExists(DbConstants.TABLES.CATEGORIES)
}

