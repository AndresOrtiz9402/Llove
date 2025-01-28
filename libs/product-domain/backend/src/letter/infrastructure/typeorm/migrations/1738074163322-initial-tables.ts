import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialTables1738074163322 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "letters_options"(
            "id" SERIAL PRIMARY KEY,
            "is_for" varchar NOT NULL,
            "occasion" varchar NOT NULL,
            "relationship" varchar NOT NULL,
            "tone" varchar NOT NULL,
            "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
            "deleted_at" timestamp DEFAULT (NULL)
        );

        CREATE TABLE "letters" (
            "id" SERIAL PRIMARY KEY,
            "title" varchar(100) NOT NULL,
            "content" varchar NOT NULL,
            "user_id" int NOT NULL,
            "letter_options_id" int NOT NULL,
            "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
            "deleted_at" timestamp DEFAULT (NULL)
        );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE letters, letters_options;
        `);
  }
}
