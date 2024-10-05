import { TestUtils } from '../../test-utils/test-utils';
import { BaseModel } from './base-model';
import { Knex } from 'knex';
import { QueryBuilder } from 'objection';

describe('BaseModel', () => {
  class NewClass extends BaseModel {
    fooBar: string;
  }
  it('should be defined', () => {
    const obj = new NewClass();
    expect(obj).toBeDefined();
  });

  describe('getName', () => {
    it('should convert the current class name to lower camelCase', () => {
      expect(NewClass.tableName).toEqual('newClass');
    });
  });

  describe('idColumn', () => {
    it('should return id as idColumn', () => {
      expect(NewClass.idColumn).toEqual('id');
    });
  });

  describe('hooks', () => {
    let knex: Knex;
    let query: QueryBuilder<NewClass, NewClass[]>;
    let obj: NewClass;
    beforeAll(async () => {
      knex = TestUtils.createMockKnexMemPg();

      await TestUtils.convertSchemaBuilderToPromise(
        knex.schema.withSchema('public').createTable('new_class', (table) => {
          table.increments('id').primary();
          table.timestamps();
          table.boolean('is_active').defaultTo(true);
          table.string('foo_bar').notNullable();
        }),
      );
    });

    beforeEach(() => {
      query = NewClass.query(knex);
    });

    afterAll(async () => {
      await knex.destroy();
    });

    it('should insert and create an object of NewClass with id and timestamps', async () => {
      obj = await query.insert({
        fooBar: 'some random data',
      });

      expect(obj.id).toBeDefined();
      expect(obj.createdAt).toBeDefined();
      expect(obj.createdAt).toBeInstanceOf(Date);
      expect(obj.updatedAt).toBeDefined();
      expect(obj.updatedAt).toBeInstanceOf(Date);
      expect(obj.fooBar).toEqual('some random data');
    });

    it('should return count of one', async () => {
      const count = await query.resultSize();
      expect(count).toEqual(1);
    });

    it('should return the obj when used where clause', async () => {
      const selectedObj = await query.where('id', '=', obj.id).first();

      expect(selectedObj.id).toEqual(obj.id);
      expect(selectedObj.fooBar).toEqual('some random data');
    });

    it('should run updated hook when any object is updated', async () => {
      const updatedObj = await query
        .update({
          fooBar: 'data',
        })
        .where('id', obj.id)
        .returning('*')
        .first();

      expect(updatedObj).toBeDefined();
      expect(updatedObj.updatedAt).not.toEqual(obj.updatedAt);
    });
  });
});
