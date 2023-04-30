import { MigrationInterface, QueryRunner } from "typeorm";

export class ab1682885897907 implements MigrationInterface {
    name = 'ab1682885897907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vms_valuation\` ADD \`amount\` double NOT NULL DEFAULT '5000'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vms_valuation\` DROP COLUMN \`amount\``);
    }

}
