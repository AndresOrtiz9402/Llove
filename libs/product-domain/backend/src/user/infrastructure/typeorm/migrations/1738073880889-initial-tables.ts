import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialTables1738073880889 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "users" (
            "id" SERIAL PRIMARY KEY,
            "name" varchar(50) UNIQUE NOT NULL,
            "email" varchar(100) UNIQUE NOT NULL,
            "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
            "deleted_at" timestamp DEFAULT (NULL)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE users;
        `);
  }
}
