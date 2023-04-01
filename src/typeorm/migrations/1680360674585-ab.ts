import { MigrationInterface, QueryRunner } from "typeorm";

export class ab1680360674585 implements MigrationInterface {
    name = 'ab1680360674585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vms_address\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`first_name\` varchar(250) NOT NULL, \`last_name\` varchar(250) NULL, \`email\` varchar(250) NULL, \`phone\` varchar(50) NULL, \`address_type\` varchar(50) NULL, \`address_line_1\` text NOT NULL, \`address_line_2\` text NULL, \`landmark\` text NULL, \`city\` varchar(100) NOT NULL, \`state\` varchar(100) NOT NULL, \`pincode\` varchar(10) NOT NULL, \`country\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vms_valuation\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`applicant_id\` varchar(36) NULL, \`lender_id\` varchar(36) NOT NULL, \`valuer_id\` varchar(36) NULL, \`propery_id\` varchar(36) NULL, \`status\` varchar(36) NOT NULL, \`date_of_valuation\` varchar(36) NULL, \`subject\` text NULL, \`address_id\` varchar(36) NOT NULL, \`valuationReportUrl\` varchar(200) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`vms_valuation\``);
        await queryRunner.query(`DROP TABLE \`vms_address\``);
    }

}
