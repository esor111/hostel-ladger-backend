import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedChargeTypesAndDiscountTypes1704067700000 implements MigrationInterface {
  name = 'SeedChargeTypesAndDiscountTypes1704067700000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert predefined charge types
    await queryRunner.query(`
      INSERT INTO "charge_types" (
        "code", "label", "description", "category", "default_amount", 
        "is_system_defined", "is_active", "requires_approval", "max_amount"
      ) VALUES 
      (
        'late_fee_overdue', 
        'Late Fee - Payment Overdue', 
        'Late fee applied when payment is overdue beyond grace period',
        'late_fee', 
        500.00, 
        true, 
        true, 
        false, 
        2000.00
      ),
      (
        'late_fee_partial', 
        'Late Fee - Partial Payment', 
        'Late fee applied when only partial payment is made',
        'late_fee', 
        300.00, 
        true, 
        true, 
        false, 
        1500.00
      ),
      (
        'penalty_rule', 
        'Penalty - Rule Violation', 
        'Penalty charge for violating hostel rules and regulations',
        'penalty', 
        1000.00, 
        true, 
        true, 
        true, 
        5000.00
      ),
      (
        'penalty_noise', 
        'Penalty - Noise Complaint', 
        'Penalty charge for noise complaints and disturbance',
        'penalty', 
        500.00, 
        true, 
        true, 
        false, 
        2000.00
      ),
      (
        'penalty_damage', 
        'Penalty - Damage Charge', 
        'Penalty charge for property damage or misuse',
        'penalty', 
        2000.00, 
        true, 
        true, 
        true, 
        10000.00
      ),
      (
        'admin_fee', 
        'Administrative Fee', 
        'General administrative fee for various services',
        'admin_fee', 
        200.00, 
        true, 
        true, 
        false, 
        1000.00
      ),
      (
        'processing_fee', 
        'Processing Fee', 
        'Fee for processing special requests or documents',
        'service_charge', 
        150.00, 
        true, 
        true, 
        false, 
        500.00
      ),
      (
        'service_charge', 
        'Service Charge', 
        'General service charge for additional services',
        'service_charge', 
        300.00, 
        true, 
        true, 
        false, 
        1500.00
      ),
      (
        'custom', 
        'Custom Charge', 
        'Custom charge type for manual entry with description',
        'custom', 
        NULL, 
        true, 
        true, 
        false, 
        NULL
      )
    `);

    // Check if discount_types table exists and has data, if not, insert predefined discount types
    const discountTypesExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'discount_types'
      )
    `);

    if (discountTypesExists[0].exists) {
      const discountTypesCount = await queryRunner.query(`SELECT COUNT(*) FROM "discount_types"`);
      
      if (parseInt(discountTypesCount[0].count) === 0) {
        // Insert predefined discount types if table is empty
        await queryRunner.query(`
          INSERT INTO "discount_types" (
            "name", "description", "category", "default_amount", 
            "is_percentage", "percentage_value", "max_amount", 
            "requires_approval", "auto_apply", "is_active"
          ) VALUES 
          (
            'Good Behavior', 
            'Discount for students with excellent behavior record',
            'academic', 
            500.00, 
            false, 
            NULL, 
            2000.00, 
            false, 
            false, 
            true
          ),
          (
            'Early Payment', 
            'Discount for payments made before due date',
            'early_payment', 
            200.00, 
            true, 
            5.00, 
            1000.00, 
            false, 
            true, 
            true
          ),
          (
            'Referral Bonus', 
            'Discount for referring new students to the hostel',
            'promotional', 
            1000.00, 
            false, 
            NULL, 
            3000.00, 
            false, 
            false, 
            true
          ),
          (
            'Financial Hardship', 
            'Special discount for students facing financial difficulties',
            'financial_hardship', 
            2000.00, 
            false, 
            NULL, 
            5000.00, 
            true, 
            false, 
            true
          ),
          (
            'Long-term Stay', 
            'Discount for students staying for extended periods',
            'loyalty', 
            1500.00, 
            true, 
            10.00, 
            4000.00, 
            false, 
            true, 
            true
          ),
          (
            'Sibling Discount', 
            'Discount for students with siblings in the same hostel',
            'sibling', 
            1000.00, 
            true, 
            15.00, 
            3000.00, 
            false, 
            false, 
            true
          ),
          (
            'Academic Excellence', 
            'Discount for students with outstanding academic performance',
            'academic', 
            1500.00, 
            false, 
            NULL, 
            4000.00, 
            true, 
            false, 
            true
          ),
          (
            'Staff Discount', 
            'Special discount for staff members and their families',
            'staff', 
            2500.00, 
            true, 
            20.00, 
            6000.00, 
            false, 
            false, 
            true
          )
        `);
      }
    }

    // Create a function to generate reference IDs for admin charges
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION generate_admin_charge_reference()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.reference_id IS NULL THEN
          NEW.reference_id := 'ADMIN-' || EXTRACT(YEAR FROM NEW.applied_at) || 
                              LPAD(EXTRACT(MONTH FROM NEW.applied_at)::text, 2, '0') || '-' ||
                              LPAD(nextval('admin_charge_sequence')::text, 6, '0');
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    // Create sequence for admin charge reference IDs
    await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS admin_charge_sequence START 1`);

    // Create trigger to auto-generate reference IDs
    await queryRunner.query(`
      CREATE TRIGGER trigger_generate_admin_charge_reference
        BEFORE INSERT ON "admin_charges"
        FOR EACH ROW
        EXECUTE FUNCTION generate_admin_charge_reference();
    `);

    // Create a view for admin charge statistics
    await queryRunner.query(`
      CREATE OR REPLACE VIEW admin_charge_stats AS
      SELECT 
        DATE(applied_at) as charge_date,
        COUNT(*) as total_charges,
        SUM(amount) as total_amount,
        COUNT(DISTINCT student_id) as students_charged,
        AVG(amount) as average_charge,
        COUNT(*) FILTER (WHERE status = 'active') as active_charges,
        COUNT(*) FILTER (WHERE status = 'reversed') as reversed_charges,
        SUM(amount) FILTER (WHERE status = 'active') as active_amount,
        SUM(amount) FILTER (WHERE status = 'reversed') as reversed_amount
      FROM admin_charges
      GROUP BY DATE(applied_at)
      ORDER BY charge_date DESC;
    `);

    // Create a view for overdue students (for quick access)
    await queryRunner.query(`
      CREATE OR REPLACE VIEW overdue_students AS
      SELECT DISTINCT
        s.id,
        s.name,
        s.phone,
        s.email,
        r.room_number as room_number,
        COALESCE(
          (SELECT SUM(debit - credit) 
           FROM ledger_entries le 
           WHERE le.student_id = s.id AND le.balance_type = 'Dr'), 
          0
        ) as current_balance,
        COALESCE(
          (SELECT MAX(date) 
           FROM ledger_entries le 
           WHERE le.student_id = s.id AND le.type = 'Payment'), 
          s.enrollment_date
        ) as last_payment_date,
        CURRENT_DATE - COALESCE(
          (SELECT MAX(date) 
           FROM ledger_entries le 
           WHERE le.student_id = s.id AND le.type = 'Payment'), 
          s.enrollment_date
        ) as days_since_payment
      FROM students s
      LEFT JOIN rooms r ON s.room_id = r.id
      WHERE s.status = 'Active'
        AND COALESCE(
          (SELECT SUM(debit - credit) 
           FROM ledger_entries le 
           WHERE le.student_id = s.id AND le.balance_type = 'Dr'), 
          0
        ) > 0
        AND CURRENT_DATE - COALESCE(
          (SELECT MAX(date) 
           FROM ledger_entries le 
           WHERE le.student_id = s.id AND le.type = 'Payment'), 
          s.enrollment_date
        ) > 5
      ORDER BY current_balance DESC, days_since_payment DESC;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop views
    await queryRunner.query(`DROP VIEW IF EXISTS overdue_students`);
    await queryRunner.query(`DROP VIEW IF EXISTS admin_charge_stats`);

    // Drop trigger and function
    await queryRunner.query(`DROP TRIGGER IF EXISTS trigger_generate_admin_charge_reference ON "admin_charges"`);
    await queryRunner.query(`DROP FUNCTION IF EXISTS generate_admin_charge_reference()`);
    await queryRunner.query(`DROP SEQUENCE IF EXISTS admin_charge_sequence`);

    // Delete seeded data (only system-defined records)
    await queryRunner.query(`DELETE FROM "charge_types" WHERE "is_system_defined" = true`);
    
    // Only delete discount types if they were inserted by this migration
    const discountTypesExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'discount_types'
      )
    `);

    if (discountTypesExists[0].exists) {
      await queryRunner.query(`
        DELETE FROM "discount_types" 
        WHERE "name" IN (
          'Good Behavior', 'Early Payment', 'Referral Bonus', 'Financial Hardship',
          'Long-term Stay', 'Sibling Discount', 'Academic Excellence', 'Staff Discount'
        )
      `);
    }
  }
}