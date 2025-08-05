import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1754391734080 implements MigrationInterface {
    name = 'CreateUsersTable1754391734080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'manager', 'staff', 'accountant', 'maintenance')`);
        await queryRunner.query(`CREATE TYPE "public"."users_department_enum" AS ENUM('administration', 'accounts', 'maintenance', 'reception', 'security')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "fullName" character varying(100) NOT NULL, "password" character varying(255), "role" "public"."users_role_enum" NOT NULL DEFAULT 'staff', "department" "public"."users_department_enum" NOT NULL DEFAULT 'administration', "permissions" text, "isActive" boolean NOT NULL DEFAULT true, "phone" character varying(15), "profileImage" character varying(255), "lastLogin" TIMESTAMP, "notes" character varying(500), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying(100), "updatedBy" character varying(100), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_department_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
