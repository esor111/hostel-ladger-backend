import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnhanceLedgerEntries1704067600000 implements MigrationInterface {
  name = 'EnhanceLedgerEntries1704067600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create ENUM type for entry source
    await queryRunner.query(`
      CREATE TYPE "ledger_entry_source_enum" AS ENUM('manual', 'invoice', 'payment', 'admin_charge', 'discount', 'adjustment', 'system')
    `);

    // Add new columns to ledger_entries table (all nullable for backward compatibility)
    await queryRunner.query(`
      ALTER TABLE "ledger_entries" 
      ADD COLUMN "charge_id" uuid,
      ADD COLUMN "discount_id" uuid,
      ADD COLUMN "admin_notes" text,
      ADD COLUMN "entry_source" "ledger_entry_source_enum" DEFAULT 'manual'
    `);

    // Add foreign key constraints
    await queryRunner.query(`
      ALTER TABLE "ledger_entries" ADD CONSTRAINT "FK_ledger_entries_charge_id" 
      FOREIGN KEY ("charge_id") REFERENCES "admin_charges"("id") ON DELETE SET NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "ledger_entries" ADD CONSTRAINT "FK_ledger_entries_discount_id" 
      FOREIGN KEY ("discount_id") REFERENCES "discounts"("id") ON DELETE SET NULL
    `);

    // Create indexes for new columns
    await queryRunner.query(`CREATE INDEX "IDX_ledger_entries_charge_id" ON "ledger_entries" ("charge_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_ledger_entries_discount_id" ON "ledger_entries" ("discount_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_ledger_entries_entry_source" ON "ledger_entries" ("entry_source")`);

    // Add unique constraints to ensure one-to-one relationships
    await queryRunner.query(`
      CREATE UNIQUE INDEX "UQ_ledger_entries_charge_id" ON "ledger_entries" ("charge_id") 
      WHERE "charge_id" IS NOT NULL
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "UQ_ledger_entries_discount_id" ON "ledger_entries" ("discount_id") 
      WHERE "discount_id" IS NOT NULL
    `);

    // Update existing ledger entries to set appropriate entry_source
    await queryRunner.query(`
      UPDATE "ledger_entries" 
      SET "entry_source" = CASE 
        WHEN "type" = 'Invoice' THEN 'invoice'::ledger_entry_source_enum
        WHEN "type" = 'Payment' THEN 'payment'::ledger_entry_source_enum
        WHEN "type" = 'Discount' THEN 'discount'::ledger_entry_source_enum
        WHEN "type" = 'Adjustment' THEN 'adjustment'::ledger_entry_source_enum
        ELSE 'manual'::ledger_entry_source_enum
      END
      WHERE "entry_source" IS NULL
    `);

    // Make entry_source NOT NULL after setting default values
    await queryRunner.query(`
      ALTER TABLE "ledger_entries" 
      ALTER COLUMN "entry_source" SET NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop unique indexes
    await queryRunner.query(`DROP INDEX "UQ_ledger_entries_discount_id"`);
    await queryRunner.query(`DROP INDEX "UQ_ledger_entries_charge_id"`);

    // Drop regular indexes
    await queryRunner.query(`DROP INDEX "IDX_ledger_entries_entry_source"`);
    await queryRunner.query(`DROP INDEX "IDX_ledger_entries_discount_id"`);
    await queryRunner.query(`DROP INDEX "IDX_ledger_entries_charge_id"`);

    // Drop foreign key constraints
    await queryRunner.query(`ALTER TABLE "ledger_entries" DROP CONSTRAINT "FK_ledger_entries_discount_id"`);
    await queryRunner.query(`ALTER TABLE "ledger_entries" DROP CONSTRAINT "FK_ledger_entries_charge_id"`);

    // Drop columns
    await queryRunner.query(`
      ALTER TABLE "ledger_entries" 
      DROP COLUMN "entry_source",
      DROP COLUMN "admin_notes",
      DROP COLUMN "discount_id",
      DROP COLUMN "charge_id"
    `);

    // Drop ENUM type
    await queryRunner.query(`DROP TYPE "ledger_entry_source_enum"`);
  }
}