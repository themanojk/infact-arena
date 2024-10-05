import { TestUtils } from './test-utils';

describe('TestUtils', () => {
  it('should be defined', () => {
    expect(new TestUtils()).toBeDefined();
  });

  describe('createMockKnexMemPg', () => {
    it('should create a Knex adapter when called', () => {
      const k = TestUtils.createMockKnexMemPg();
      expect(k.schema).toBeDefined();
      expect(k.table).toBeDefined();
      expect(k.transaction).toBeDefined();
    });
  });

  describe('convertSchemaBuilderToPromise', () => {
    const knex = TestUtils.createMockKnexMemPg();
    afterAll(async () => await knex.destroy());
    it('should resolve with true if callback resolves', async () => {
      const result = await TestUtils.convertSchemaBuilderToPromise(
        knex.schema.createTable('users', (table) => {
          table.increments('id');
          table.string('name');
        }),
      );
      expect(result).toBe(true);
    });

    it('should reject with an error if callback rejects', async () => {
      try {
        await TestUtils.convertSchemaBuilderToPromise(
          knex.schema.raw('invalid query'),
        );
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
