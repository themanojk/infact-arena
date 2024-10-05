import type { Knex } from "knex";
import { DbConstants } from "../libs/common/constants/db.constants";
import { KnexOrmService } from "../libs/knex-orm/src/knex-orm.service";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.withSchema(DbConstants.SCHEMA_NAME).createTable(DbConstants.TABLES.SPORTS, (table) => {
        KnexOrmService.baseSchemaBuilderQuery(table, knex);
        table.string('name').unique().notNullable();
        table.string('description');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.withSchema('public').dropTableIfExists(DbConstants.TABLES.SPORTS)
}

