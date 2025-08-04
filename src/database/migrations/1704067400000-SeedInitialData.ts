import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedInitialData1704067400000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Seed Buildings
        await queryRunner.query(`
            INSERT INTO buildings (id, name, address, total_floors, total_rooms, status, description, facilities, contact_info, is_active, created_at, updated_at) VALUES
            (uuid_generate_v4(), 'Main Building', '123 Hostel Street, City', 4, 50, 'active', 'Main hostel building with modern facilities', '["WiFi", "Elevator", "Security", "Parking"]', '{"phone": "+1234567890", "email": "main@hostel.com"}', true, NOW(), NOW()),
            (uuid_generate_v4(), 'Annex Building', '456 Hostel Avenue, City', 3, 30, 'active', 'Secondary building for additional accommodation', '["WiFi", "Security", "Common Room"]', '{"phone": "+1234567891", "email": "annex@hostel.com"}', true, NOW(), NOW());
        `);

        // 2. Seed Room Types
        await queryRunner.query(`
            INSERT INTO room_types (id, name, description, default_bed_count, max_occupancy, base_monthly_rate, base_daily_rate, pricing_model, features, is_active, created_at, updated_at) VALUES
            (uuid_generate_v4(), 'Single AC', 'Single occupancy room with air conditioning', 1, 1, 8000, 267, 'monthly', '["AC", "WiFi", "Study Table", "Wardrobe"]', true, NOW(), NOW()),
            (uuid_generate_v4(), 'Double AC', 'Double occupancy room with air conditioning', 2, 2, 6000, 200, 'monthly', '["AC", "WiFi", "Study Tables", "Wardrobes"]', true, NOW(), NOW()),
            (uuid_generate_v4(), 'Triple Non-AC', 'Triple occupancy room without air conditioning', 3, 3, 4000, 133, 'monthly', '["WiFi", "Study Tables", "Wardrobes", "Fan"]', true, NOW(), NOW());
        `);

        // 3. Seed Amenities
        await queryRunner.query(`
            INSERT INTO amenities (id, name, category, description, maintenance_required, is_active, created_at, updated_at) VALUES
            (uuid_generate_v4(), 'Air Conditioning', 'utilities', 'Split AC unit for room cooling', true, true, NOW(), NOW()),
            (uuid_generate_v4(), 'WiFi', 'utilities', 'High-speed internet connection', false, true, NOW(), NOW()),
            (uuid_generate_v4(), 'Study Table', 'furniture', 'Wooden study table with drawers', false, true, NOW(), NOW()),
            (uuid_generate_v4(), 'Wardrobe', 'furniture', '3-door wooden wardrobe', false, true, NOW(), NOW()),
            (uuid_generate_v4(), 'Ceiling Fan', 'utilities', 'High-speed ceiling fan', true, true, NOW(), NOW());
        `);

        // 4. Seed Rooms (using CTEs to get the IDs)
        await queryRunner.query(`
            WITH building_data AS (
                SELECT id as building_id FROM buildings WHERE name = 'Main Building' LIMIT 1
            ),
            single_type AS (
                SELECT id as type_id FROM room_types WHERE name = 'Single AC' LIMIT 1
            ),
            double_type AS (
                SELECT id as type_id FROM room_types WHERE name = 'Double AC' LIMIT 1
            ),
            triple_type AS (
                SELECT id as type_id FROM room_types WHERE name = 'Triple Non-AC' LIMIT 1
            )
            INSERT INTO rooms (id, name, room_number, building_id, room_type_id, floor, capacity, bed_count, occupancy, rent, status, maintenance_status, gender, description, notes, created_at, updated_at)
            SELECT 
                uuid_generate_v4(),
                'Room ' || room_number,
                room_number,
                building_data.building_id,
                CASE 
                    WHEN CAST(RIGHT(room_number, 2) AS INTEGER) <= 4 THEN single_type.type_id
                    WHEN CAST(RIGHT(room_number, 2) AS INTEGER) <= 8 THEN double_type.type_id
                    ELSE triple_type.type_id
                END,
                CAST(LEFT(room_number, 1) AS INTEGER),
                CASE 
                    WHEN CAST(RIGHT(room_number, 2) AS INTEGER) <= 4 THEN 1
                    WHEN CAST(RIGHT(room_number, 2) AS INTEGER) <= 8 THEN 2
                    ELSE 3
                END,
                CASE 
                    WHEN CAST(RIGHT(room_number, 2) AS INTEGER) <= 4 THEN 1
                    WHEN CAST(RIGHT(room_number, 2) AS INTEGER) <= 8 THEN 2
                    ELSE 3
                END,
                0,
                CASE 
                    WHEN CAST(RIGHT(room_number, 2) AS INTEGER) <= 4 THEN 8000
                    WHEN CAST(RIGHT(room_number, 2) AS INTEGER) <= 8 THEN 6000
                    ELSE 4000
                END,
                'active',
                'good',
                CASE WHEN CAST(LEFT(room_number, 1) AS INTEGER) <= 2 THEN 'male' ELSE 'female' END,
                'Room ' || room_number || ' on floor ' || LEFT(room_number, 1),
                CASE 
                    WHEN CAST(RIGHT(room_number, 2) AS INTEGER) <= 4 THEN '1-bed room'
                    WHEN CAST(RIGHT(room_number, 2) AS INTEGER) <= 8 THEN '2-bed room'
                    ELSE '3-bed room'
                END || ' on floor ' || LEFT(room_number, 1),
                NOW(),
                NOW()
            FROM building_data, single_type, double_type, triple_type,
            (SELECT LPAD(floor::text, 1, '0') || LPAD(room::text, 2, '0') as room_number
             FROM generate_series(1, 4) as floor,
                  generate_series(1, 12) as room
            ) room_numbers;
        `);

        // 5. Seed Students (using actual room IDs)
        await queryRunner.query(`
            WITH available_rooms AS (
                SELECT id, room_number FROM rooms ORDER BY room_number LIMIT 3
            )
            INSERT INTO students (id, name, phone, email, address, room_id, enrollment_date, status, emergency_contact, guardian_name, guardian_phone, id_proof_type, id_proof_number, date_of_birth, blood_group, is_active, created_at, updated_at)
            SELECT 
                uuid_generate_v4(),
                student_data.name,
                student_data.phone,
                student_data.email,
                student_data.address,
                available_rooms.id,
                student_data.enrollment_date,
                'Active',
                student_data.emergency_contact,
                student_data.guardian_name,
                student_data.guardian_phone,
                student_data.id_proof_type,
                student_data.id_proof_number,
                student_data.date_of_birth,
                student_data.blood_group,
                true,
                NOW(),
                NOW()
            FROM (
                VALUES 
                    ('John Doe', '9876543210', 'john.doe@email.com', '123 Student Street, City', '2024-01-15'::date, '9876543211', 'Robert Doe', '9876543211', 'Aadhar', '123456789012', '2002-05-15'::date, 'O+'),
                    ('Jane Smith', '9876543220', 'jane.smith@email.com', '456 Student Avenue, City', '2024-01-20'::date, '9876543221', 'Mary Smith', '9876543221', 'Passport', 'P1234567', '2001-08-22'::date, 'A+'),
                    ('Mike Johnson', '9876543230', 'mike.johnson@email.com', '789 Student Road, City', '2024-02-01'::date, '9876543231', 'David Johnson', '9876543231', 'Aadhar', '123456789013', '2003-03-10'::date, 'B+')
            ) AS student_data(name, phone, email, address, enrollment_date, emergency_contact, guardian_name, guardian_phone, id_proof_type, id_proof_number, date_of_birth, blood_group),
            available_rooms
            WHERE available_rooms.id = (
                SELECT id FROM available_rooms 
                ORDER BY room_number 
                OFFSET (ROW_NUMBER() OVER () - 1) 
                LIMIT 1
            );
        `);

        // 6. Seed Student Contacts
        await queryRunner.query(`
            INSERT INTO student_contacts (id, student_id, type, name, phone, email, relationship, is_active, created_at, updated_at)
            SELECT 
                uuid_generate_v4(),
                s.id,
                'emergency',
                s.guardian_name,
                s.guardian_phone,
                NULL,
                'Guardian',
                true,
                NOW(),
                NOW()
            FROM students s;
        `);

        // 7. Seed Student Academic Info
        await queryRunner.query(`
            WITH student_data AS (
                SELECT 
                    s.id,
                    ROW_NUMBER() OVER (ORDER BY s.name) as rn
                FROM students s
            )
            INSERT INTO student_academic_info (id, student_id, course, institution, academic_year, semester, student_id_number, is_active, created_at, updated_at)
            SELECT 
                uuid_generate_v4(),
                student_data.id,
                CASE 
                    WHEN rn = 1 THEN 'Computer Science'
                    WHEN rn = 2 THEN 'Business Administration'
                    ELSE 'Mechanical Engineering'
                END,
                CASE 
                    WHEN rn = 1 THEN 'Tech University'
                    WHEN rn = 2 THEN 'Business College'
                    ELSE 'Engineering College'
                END,
                '2023-2024',
                CASE 
                    WHEN rn = 1 THEN '4th'
                    WHEN rn = 2 THEN '6th'
                    ELSE '2nd'
                END,
                CASE 
                    WHEN rn = 1 THEN 'CS2022001'
                    WHEN rn = 2 THEN 'BA2021002'
                    ELSE 'ME2023003'
                END,
                true,
                NOW(),
                NOW()
            FROM student_data;
        `);

        // 8. Seed Student Financial Info
        await queryRunner.query(`
            WITH student_data AS (
                SELECT 
                    s.id,
                    r.rent,
                    ROW_NUMBER() OVER (ORDER BY s.name) as rn
                FROM students s
                JOIN rooms r ON s.room_id = r.id
            )
            INSERT INTO student_financial_info (id, student_id, fee_type, amount, effective_from, is_active, created_at, updated_at)
            SELECT 
                uuid_generate_v4(),
                student_data.id,
                'base_monthly',
                student_data.rent,
                '2024-07-01'::date,
                true,
                NOW(),
                NOW()
            FROM student_data;
        `);

        // 9. Seed Invoices
        await queryRunner.query(`
            WITH student_data AS (
                SELECT 
                    s.id,
                    r.rent,
                    ROW_NUMBER() OVER (ORDER BY s.name) as rn
                FROM students s
                JOIN rooms r ON s.room_id = r.id
            )
            INSERT INTO invoices (id, student_id, month, due_date, total, status, notes, created_by, created_at, updated_at)
            SELECT 
                uuid_generate_v4(),
                student_data.id,
                '2024-07',
                '2024-07-31'::date,
                student_data.rent + 500, -- Add utilities
                CASE 
                    WHEN rn <= 2 THEN 'Paid'
                    ELSE 'Partially Paid'
                END,
                'Monthly rent and utilities',
                'admin',
                NOW(),
                NOW()
            FROM student_data;
        `);

        // 10. Seed Invoice Items
        await queryRunner.query(`
            INSERT INTO invoice_items (id, invoice_id, description, quantity, unit_price, amount, category, created_at, updated_at)
            SELECT 
                uuid_generate_v4(),
                i.id,
                'Room Rent - ' || rt.name,
                1,
                r.rent,
                r.rent,
                'Accommodation',
                NOW(),
                NOW()
            FROM invoices i
            JOIN students s ON i.student_id = s.id
            JOIN rooms r ON s.room_id = r.id
            JOIN room_types rt ON r.room_type_id = rt.id;
        `);

        // 11. Seed Payments
        await queryRunner.query(`
            WITH student_data AS (
                SELECT 
                    s.id,
                    i.id as invoice_id,
                    i.total,
                    ROW_NUMBER() OVER (ORDER BY s.name) as rn
                FROM students s
                JOIN invoices i ON s.id = i.student_id
            )
            INSERT INTO payments (id, student_id, amount, payment_date, payment_method, reference_number, status, notes, processed_by, created_at, updated_at)
            SELECT 
                uuid_generate_v4(),
                student_data.id,
                CASE 
                    WHEN rn <= 2 THEN student_data.total
                    ELSE student_data.total * 0.5 -- Partial payment for 3rd student
                END,
                ('2024-07-0' || (rn + 2)::text)::date,
                CASE 
                    WHEN rn = 1 THEN 'upi'
                    WHEN rn = 2 THEN 'cash'
                    ELSE 'bank_transfer'
                END,
                'REF' || LPAD(rn::text, 3, '0'),
                'completed',
                'Payment for July 2024',
                'admin',
                NOW(),
                NOW()
            FROM student_data;
        `);

        // 12. Seed Ledger Entries
        await queryRunner.query(`
            -- Debit entries for invoices
            INSERT INTO ledger_entries (id, student_id, date, type, description, reference_id, debit, credit, balance, balance_type, created_by, created_at, updated_at)
            SELECT 
                uuid_generate_v4(),
                i.student_id,
                i.due_date,
                'Invoice',
                'Invoice - Monthly charges',
                i.id,
                i.total,
                0,
                i.total,
                'Dr',
                'system',
                NOW(),
                NOW()
            FROM invoices i;
        `);

        await queryRunner.query(`
            -- Credit entries for payments
            INSERT INTO ledger_entries (id, student_id, date, type, description, reference_id, debit, credit, balance, balance_type, created_by, created_at, updated_at)
            SELECT 
                uuid_generate_v4(),
                p.student_id,
                p.payment_date,
                'Payment',
                'Payment - ' || p.payment_method,
                p.id,
                0,
                p.amount,
                CASE 
                    WHEN p.amount >= (SELECT total FROM invoices WHERE student_id = p.student_id LIMIT 1) THEN 0
                    ELSE (SELECT total FROM invoices WHERE student_id = p.student_id LIMIT 1) - p.amount
                END,
                CASE 
                    WHEN p.amount >= (SELECT total FROM invoices WHERE student_id = p.student_id LIMIT 1) THEN 'Nil'
                    ELSE 'Dr'
                END,
                'system',
                NOW(),
                NOW()
            FROM payments p;
        `);

        // 13. Seed Booking Requests
        await queryRunner.query(`
            WITH student_room_data AS (
                SELECT 
                    s.id as student_id,
                    s.room_id,
                    ROW_NUMBER() OVER (ORDER BY s.name) as rn
                FROM students s
                LIMIT 2
            )
            INSERT INTO booking_requests (id, name, phone, email, student_id, room_id, request_date, preferred_move_in_date, actual_move_in_date, status, notes, processed_by, processed_date, created_at, updated_at)
            SELECT 
                uuid_generate_v4(),
                s.name,
                s.phone,
                s.email,
                student_room_data.student_id,
                student_room_data.room_id,
                ('2024-01-' || LPAD((10 + (rn-1)*8)::text, 2, '0'))::date,
                ('2024-01-' || LPAD((15 + (rn-1)*5)::text, 2, '0'))::date,
                ('2024-01-' || LPAD((15 + (rn-1)*5)::text, 2, '0'))::date,
                'approved',
                'Booking request ' || rn,
                'admin',
                ('2024-01-' || LPAD((12 + (rn-1)*7)::text, 2, '0'))::date,
                NOW(),
                NOW()
            FROM student_room_data
            JOIN students s ON student_room_data.student_id = s.id;
        `);

        console.log('✅ Initial data seeded successfully!');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove seeded data in reverse order
        await queryRunner.query(`DELETE FROM booking_requests;`);
        await queryRunner.query(`DELETE FROM ledger_entries;`);
        await queryRunner.query(`DELETE FROM payments;`);
        await queryRunner.query(`DELETE FROM invoice_items;`);
        await queryRunner.query(`DELETE FROM invoices;`);
        await queryRunner.query(`DELETE FROM student_financial_info;`);
        await queryRunner.query(`DELETE FROM student_academic_info;`);
        await queryRunner.query(`DELETE FROM student_contacts;`);
        await queryRunner.query(`DELETE FROM students;`);
        await queryRunner.query(`DELETE FROM room_amenities;`);
        await queryRunner.query(`DELETE FROM room_layouts;`);
        await queryRunner.query(`DELETE FROM rooms;`);
        await queryRunner.query(`DELETE FROM amenities;`);
        await queryRunner.query(`DELETE FROM room_types;`);
        await queryRunner.query(`DELETE FROM buildings;`);
        
        console.log('✅ Seeded data removed successfully!');
    }
}