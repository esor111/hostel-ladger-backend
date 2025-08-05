import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAdminChargesSystem1704067500000 implements MigrationInterface {
  name = 'CreateAdminChargesSystem1704067500000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create ENUM types for admin charges
    await queryRunner.query(`
      CREATE TYPE "charge_status_enum" AS ENUM('active', 'reversed')
    `);
    
    await queryRunner.query(`
      CREATE TYPE "charge_category_enum" AS ENUM('late_fee', 'penalty', 'admin_fee', 'service_charge', 'custom')
    `);

    // Create Charge Types table
    await queryRunner.query(`
      CREATE TABLE "charge_types" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "code" character varying(50) NOT NULL,
        "label" character varying(200) NOT NULL,
        "description" text,
        "category" "charge_category_enum" NOT NULL DEFAULT 'custom',
        "default_amount" decimal(10,2),
        "is_system_defined" boolean NOT NULL DEFAULT false,
        "is_active" boolean NOT NULL DEFAULT true,
        "requires_approval" boolean NOT NULL DEFAULT false,
        "max_amount" decimal(10,2),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "created_by" character varying(100),
        "updated_by" character varying(100),
        CONSTRAINT "PK_charge_types" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_charge_types_code" UNIQUE ("code")
      )
    `);

    // Create Admin Charges table
    await queryRunner.query(`
      CREATE TABLE "admin_charges" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "student_id" character varying(50) NOT NULL,
        "charge_type_id" uuid,
        "amount" decimal(10,2) NOT NULL,
        "description" text NOT NULL,
        "custom_description" text,
        "admin_notes" text,
        "applied_by" character varying(100) NOT NULL,
        "applied_at" TIMESTAMP NOT NULL DEFAULT now(),
        "reference_id" character varying(100),
        "status" "charge_status_enum" NOT NULL DEFAULT 'active',
        "reversed_by" character varying(100),
        "reversal_reason" text,
        "reversed_at" TIMESTAMP,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "created_by" character varying(100),
        "updated_by" character varying(100),
        CONSTRAINT "PK_admin_charges" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_admin_charges_reference_id" UNIQUE ("reference_id"),
        CONSTRAINT "CHK_admin_charges_amount_positive" CHECK ("amount" > 0),
        CONSTRAINT "CHK_admin_charges_reversal_logic" CHECK (
          ("status" = 'active' AND "reversed_by" IS NULL AND "reversal_reason" IS NULL AND "reversed_at" IS NULL) OR
          ("status" = 'reversed' AND "reversed_by" IS NOT NULL AND "reversal_reason" IS NOT NULL AND "reversed_at" IS NOT NULL)
        )
      )
    `);

    // Add foreign key constraints
    await queryRunner.query(`
      ALTER TABLE "admin_charges" ADD CONSTRAINT "FK_admin_charges_student_id" 
      FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "admin_charges" ADD CONSTRAINT "FK_admin_charges_charge_type_id" 
      FOREIGN KEY ("charge_type_id") REFERENCES "charge_types"("id") ON DELETE SET NULL
    `);

    // Create indexes for performance
    await queryRunner.query(`CREATE INDEX "IDX_admin_charges_student_id" ON "admin_charges" ("student_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_admin_charges_applied_at" ON "admin_charges" ("applied_at")`);
    await queryRunner.query(`CREATE INDEX "IDX_admin_charges_status" ON "admin_charges" ("status")`);
    await queryRunner.query(`CREATE INDEX "IDX_admin_charges_charge_type_id" ON "admin_charges" ("charge_type_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_admin_charges_applied_by" ON "admin_charges" ("applied_by")`);
    await queryRunner.query(`CREATE INDEX "IDX_admin_charges_reference_id" ON "admin_charges" ("reference_id")`);

    await queryRunner.query(`CREATE INDEX "IDX_charge_types_code" ON "charge_types" ("code")`);
    await queryRunner.query(`CREATE INDEX "IDX_charge_types_category" ON "charge_types" ("category")`);
    await queryRunner.query(`CREATE INDEX "IDX_charge_types_is_active" ON "charge_types" ("is_active")`);
    await queryRunner.query(`CREATE INDEX "IDX_charge_types_is_system_defined" ON "charge_types" ("is_system_defined")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(`DROP INDEX "IDX_charge_types_is_system_defined"`);
    await queryRunner.query(`DROP INDEX "IDX_charge_types_is_active"`);
    await queryRunner.query(`DROP INDEX "IDX_charge_types_category"`);
    await queryRunner.query(`DROP INDEX "IDX_charge_types_code"`);
    
    await queryRunner.query(`DROP INDEX "IDX_admin_charges_reference_id"`);
    await queryRunner.query(`DROP INDEX "IDX_admin_charges_applied_by"`);
    await queryRunner.query(`DROP INDEX "IDX_admin_charges_charge_type_id"`);
    await queryRunner.query(`DROP INDEX "IDX_admin_charges_status"`);
    await queryRunner.query(`DROP INDEX "IDX_admin_charges_applied_at"`);
    await queryRunner.query(`DROP INDEX "IDX_admin_charges_student_id"`);

    // Drop foreign key constraints
    await queryRunner.query(`ALTER TABLE "admin_charges" DROP CONSTRAINT "FK_admin_charges_charge_type_id"`);
    await queryRunner.query(`ALTER TABLE "admin_charges" DROP CONSTRAINT "FK_admin_charges_student_id"`);

    // Drop tables
    await queryRunner.query(`DROP TABLE "admin_charges"`);
    await queryRunner.query(`DROP TABLE "charge_types"`);

    // Drop ENUM types
    await queryRunner.query(`DROP TYPE "charge_category_enum"`);
    await queryRunner.query(`DROP TYPE "charge_status_enum"`);
  }
}