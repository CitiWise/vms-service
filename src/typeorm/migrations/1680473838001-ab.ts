import { MigrationInterface, QueryRunner } from "typeorm";

export class ab1680473838001 implements MigrationInterface {
    name = 'ab1680473838001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vms_valuation\` DROP COLUMN \`applicant_id\``);
        await queryRunner.query(`ALTER TABLE \`vms_valuation\` DROP COLUMN \`subject\``);
        await queryRunner.query(`ALTER TABLE \`vms_valuation\` ADD \`reference_number\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`vms_valuation\` ADD \`survey_number\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`vms_valuation\` ADD \`remarks\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`vms_valuation\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`vms_valuation\` ADD \`status\` enum ('WAITING_FOR_PAYMENT', 'FINDING_VALUER', 'VALUER_ASSIGNED', 'INSPECTION_SCHEDULED', 'INSPECTION_COMPLETED', 'VALUATION_SUBMITTED') NOT NULL DEFAULT 'WAITING_FOR_PAYMENT'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vms_valuation\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`vms_valuation\` ADD \`status\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vms_valuation\` DROP COLUMN \`remarks\``);
        await queryRunner.query(`ALTER TABLE \`vms_valuation\` DROP COLUMN \`survey_number\``);
        await queryRunner.query(`ALTER TABLE \`vms_valuation\` DROP COLUMN \`reference_number\``);
        await queryRunner.query(`ALTER TABLE \`vms_valuation\` ADD \`subject\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`vms_valuation\` ADD \`applicant_id\` varchar(36) NULL`);
    }

}
