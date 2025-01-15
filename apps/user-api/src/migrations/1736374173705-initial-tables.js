// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class InitialTables1736374173705 {
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
        "name" varchar(50) UNIQUE NOT NULL,
        "email" varchar(100) UNIQUE NOT NULL,
        "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
        "deleted_at" timestamp DEFAULT (NULL)
      )`);
  }

  async down(queryRunner) {
    await queryRunner.query(`
      DROP TABLE users;
      `);
  }
};
