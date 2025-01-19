const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class LetterDbInit1737312627594 {
  async up(queryRunner) {
    await queryRunner.query(`
        CREATE TABLE "letters"(
            "id" SERIAL PRIMARY KEY,
            "is_for" varchar NOT NULL,
            "occasion" varchar NOT NULL,
            "relationship" varchar NOT NULL,
            "tone" varchar NOT NULL,
            "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
            "deleted_at" timestamp DEFAULT (NULL)
        );

        CREATE TABLE "letters_configs" (
            "id" SERIAL PRIMARY KEY,
            "title" varchar(100) NOT NULL,
            "content" varchar NOT NULL,
            "user_id" int NOT NULL,
            "letter_type_id" int NOT NULL,
            "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
            "deleted_at" timestamp DEFAULT (NULL)
        );
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
        DROP TABLE letters, letter_type;
        `);
  }
};
