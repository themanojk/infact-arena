import type { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import { DataType, IMemoryDb, newDb } from 'pg-mem';

/**
 * Contains utiltiy function for tests
 */
export class TestUtils {
  static db: IMemoryDb;
  /**
   * Creates a mock Knex instance connected to an in-memory PostgreSQL database.
   *
   * @returns {Knex} A Knex instance connected to an in-memory PostgreSQL database.
   */
  static createMockKnexMemPg(config?: any): Knex {
    if (!TestUtils.db) {
      TestUtils.db = newDb();
      TestUtils.db.public.registerFunction({
        name: 'date',
        args: [DataType.timestamptz],
        returns: DataType.text,
        implementation: (date: Date) => date.toISOString().split('T').shift(),
      });

      TestUtils.db.public.registerFunction({
        name: 'current_database',
        args: [],
        returns: DataType.text,
        implementation: () => 'postgres',
      });
    }
    return TestUtils.db.adapters.createKnex(1, {
      ...config,
      ...knexSnakeCaseMappers(),
    });
  }

  static convertSchemaBuilderToPromise(callback: Knex.SchemaBuilder) {
    return new Promise((resolve, reject) => {
      callback.then(() => resolve(true)).catch((err) => reject(err));
    });
  }
}
