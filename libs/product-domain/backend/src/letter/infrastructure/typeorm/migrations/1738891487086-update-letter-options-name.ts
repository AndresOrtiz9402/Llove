import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateLetterOptionsName1738891487086 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE letters_options RENAME TO letter_options;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE letter_options RENAME TO letters_options ;`);
  }
}
