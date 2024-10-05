import { Knex } from 'knex';
require('dotenv').config();

// Update with your config settings.
type EnvType = 'development' | 'staging' | 'uat' | 'production';

const config: Record<EnvType, Knex.Config> = {
  development: {
    debug: true,
    client: 'postgresql',
    pool: {
      min: 2,
      max: 10,
    },
    connection: process.env['DATABASE_URL'],
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'postgresql',
    connection: process.env['DATABASE_URL'],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  uat: {
    client: 'postgresql',
    connection: process.env['DATABASE_URL'],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env['DATABASE_URL'],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default config;
