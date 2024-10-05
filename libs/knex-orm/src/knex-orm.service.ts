import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import knex, { Knex } from 'knex';
import Objection, { initialize, knexSnakeCaseMappers } from 'objection';
import { ConfigService } from '@nestjs/config';
import KnexConfig from '../../../knexfile';

@Injectable()
export class KnexOrmService implements OnApplicationShutdown {
  private readonly db: Knex;
  constructor(private readonly config: ConfigService) {
    this.db = knex({
      ...this.getKnexConfig(),
      ...knexSnakeCaseMappers(),
    });
  }
  async initializeModels(models: Objection.AnyModelConstructor[]) {
    await initialize(this.db, models);
  }
  async onApplicationShutdown() {
    await this.knex.destroy();
  }

  getKnexConfig(): Knex.Config {
    switch (this.config.get<string>('ENV')?.toLowerCase()) {
      case 'prod':
      case 'production':
        return KnexConfig.production;
      case 'uat':
        return KnexConfig.uat;
      case 'qa':
        return KnexConfig.staging;
      default:
        return KnexConfig.development;
    }
  }

  get knex() {
    return this.db;
  }

  static baseSchemaBuilderQuery(
    table: Knex.CreateTableBuilder,
    knex: Knex
  ) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.timestamps(true, true);
    table.boolean('is_active').defaultTo(true);
  }

  /**
   * Start a transaction
   */
  async startTransaction(): Promise<Knex.Transaction> {
    return this.knex.transaction();
  }

  /**
   * Perform an operation inside a transaction
   * @param trx - The transaction object
   * @param tableName - The name of the table to operate on
   * @param operation - A function that performs the operation, it receives the Knex query builder with the transaction
   */
  async performOperation(
    trx: Knex.Transaction,
    tableName: string,
    operation: (trxTable: Knex.QueryBuilder) => Promise<any>,
  ): Promise<any> {
    const trxTable = trx(tableName);
    return operation(trxTable);
  }

  /**
   * Commit a transaction
   * @param trx - The transaction object
   */
  async commitTransaction(trx: Knex.Transaction): Promise<void> {
    await trx.commit();
  }

  /**
   * Rollback a transaction in case of error
   * @param trx - The transaction object
   */
  async rollbackTransaction(trx: Knex.Transaction): Promise<void> {
    await trx.rollback();
  }
}
