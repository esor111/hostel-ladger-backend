const { Client } = require('pg');
require('dotenv').config();

async function seedDatabase() {
    const client = new Client({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'kaha_hostel_db'
    });

    try {
        await client.connect();
        console.log('🔗 Connected to database');

        // Check if data already exists
        const existingBuildings = await client.query('SELECT COUNT(*) FROM buildings');
        if (parseInt(existingBuildings.rows[0].count) > 0) {
            console.log('📊 Data already exists, skipping seeding');
            return;
        }

        console.log('🌱 Starting database seeding...');

        // 1. Seed Buildings
        console.log('📍 Seeding buildings...');
        await client.query(`
            INSERT INTO buildings (id, name, code, address, total_floors, total_rooms, status, construction_year, description, facilities, created_at, updated_at) VALUES
            (uuid_generate_v4(), 'Main Building', 'MB01', '123 Hostel Street, City', 4, 50, 'Active', 2020, 'Main hostel building with modern facilities', '["WiFi", "Elevator", "Security", "Parking"]', NOW(), NOW()),
            (uuid_generate_v4(), 'Annex Building', 'AB01', '456 Hostel Avenue, City', 3, 30, 'Active', 2018, 'Secondary building for additional accommodation', '["WiFi", "Security", "Common Room"]', NOW(), NOW());
        `);

        // 2. Seed Room Types
        console.log('🏠 Seeding room types...');
        await client.query(`
            INSERT INTO room_types (id, name, code, description, default_bed_count, max_occupancy, base_monthly_rate, base_daily_rate, pricing_model, security_deposit, features, is_active, created_at, updated_at) VALUES
            (uuid_generate_v4(), 'Single AC', 'SAC', 'Single occupancy room with air conditioning', 1, 1, 8000, 267, 'monthly', 2000, '["AC", "WiFi", "Study Table", "Wardrobe"]', true, NOW(), NOW()),
            (uuid_generate_v4(), 'Single Non-AC', 'SNAC', 'Single occupancy room without air conditioning', 1, 1, 6000, 200, 'monthly', 1500, '["WiFi", "Study Table", "Wardrobe", "Fan"]', true, NOW(), NOW()),
            (uuid_generate_v4(), 'Double AC', 'DAC', 'Double occupancy room with air conditioning', 2, 2, 12000, 400, 'monthly', 3000, '["AC", "WiFi", "Study Tables", "Wardrobes"]', true, NOW(), NOW()),
            (uuid_generate_v4(), 'Double Non-AC', 'DNAC', 'Double occupancy room without air conditioning', 2, 2, 9000, 300, 'monthly', 2500, '["WiFi", "Study Tables", "Wardrobes", "Fan"]', true, NOW(), NOW()),
            (uuid_generate_v4(), 'Triple Sharing', 'TS', 'Triple occupancy room for budget accommodation', 3, 3, 15000, 500, 'monthly', 4000, '["WiFi", "Study Tables", "Wardrobes", "Fan"]', true, NOW(), NOW());
        `);

        // 3. Get building and room type IDs for further seeding
        const buildings = await client.query('SELECT id, name FROM buildings ORDER BY name');
        const roomTypes = await client.query('SELECT id, name FROM room_types ORDER BY name');

        // 4. Seed Rooms
        console.log('🚪 Seeding rooms...');
        const mainBuildingId = buildings.rows.find(b => b.name === 'Main Building')?.id;
        const annexBuildingId = buildings.rows.find(b => b.name === 'Annex Building')?.id;
        const singleACType = roomTypes.rows.find(rt => rt.name === 'Single AC')?.id;
        const singleNonACType = roomTypes.rows.find(rt => rt.name === 'Single Non-AC')?.id;
        const doubleACType = roomTypes.rows.find(rt => rt.name === 'Double AC')?.id;

        if (mainBuildingId && singleACType && singleNonACType && doubleACType) {
            await client.query(`
                INSERT INTO rooms (id, name, room_number, building_id, room_type_id, bed_count, capacity, occupancy, rent, gender, status, maintenance_status, description, notes, created_at, updated_at) VALUES
                (uuid_generate_v4(), 'Room 101', '101', '${mainBuildingId}', '${singleACType}', 1, 1, 0, 8000, 'Any', 'Active', 'Good', 'Single AC room on first floor', 'Well maintained room', NOW(), NOW()),
                (uuid_generate_v4(), 'Room 102', '102', '${mainBuildingId}', '${singleACType}', 1, 1, 0, 8000, 'Any', 'Active', 'Good', 'Single AC room on first floor', 'Well maintained room', NOW(), NOW()),
                (uuid_generate_v4(), 'Room 103', '103', '${mainBuildingId}', '${singleNonACType}', 1, 1, 0, 6000, 'Any', 'Active', 'Good', 'Single Non-AC room on first floor', 'Budget friendly room', NOW(), NOW()),
                (uuid_generate_v4(), 'Room 201', '201', '${mainBuildingId}', '${doubleACType}', 2, 2, 0, 12000, 'Any', 'Active', 'Good', 'Double AC room on second floor', 'Spacious room for two', NOW(), NOW()),
                (uuid_generate_v4(), 'Room 202', '202', '${mainBuildingId}', '${doubleACType}', 2, 2, 1, 12000, 'Any', 'Active', 'Good', 'Double AC room on second floor', 'Currently occupied by one student', NOW(), NOW());
            `);
        }

        // 5. Seed Students
        console.log('👥 Seeding students...');
        const rooms = await client.query('SELECT id, room_number FROM rooms ORDER BY room_number LIMIT 3');
        
        if (rooms.rows.length >= 3) {
            const room101 = rooms.rows[0].id;
            const room102 = rooms.rows[1].id;
            const room103 = rooms.rows[2].id;

            await client.query(`
                INSERT INTO students (id, name, phone, email, enrollment_date, status, address, room_id, created_at, updated_at) VALUES
                (uuid_generate_v4(), 'John Doe', '9876543210', 'john.doe@email.com', '2024-01-15', 'Active', '123 Student Street, City', '${room101}', NOW(), NOW()),
                (uuid_generate_v4(), 'Jane Smith', '9876543220', 'jane.smith@email.com', '2024-01-20', 'Active', '456 Student Avenue, City', '${room102}', NOW(), NOW()),
                (uuid_generate_v4(), 'Mike Johnson', '9876543230', 'mike.johnson@email.com', '2024-02-01', 'Active', '789 Student Road, City', '${room103}', NOW(), NOW());
            `);

            // Update room occupancy
            await client.query(`
                UPDATE rooms SET occupancy = 1 WHERE id IN ('${room101}', '${room102}', '${room103}');
            `);
        } else {
            console.log('⚠️  Not enough rooms available for student assignment');
        }

        // 6. Seed Amenities
        console.log('🛋️ Seeding amenities...');
        await client.query(`
            INSERT INTO amenities (id, name, category, description, maintenance_required, maintenance_frequency_days, is_active, specifications, created_at, updated_at) VALUES
            (uuid_generate_v4(), 'Air Conditioning', 'utilities', 'Split AC unit for room cooling', true, 90, true, '{"type": "split", "capacity": "1.5 ton"}', NOW(), NOW()),
            (uuid_generate_v4(), 'WiFi', 'connectivity', 'High-speed internet connection', false, null, true, '{"speed": "100 Mbps", "type": "fiber"}', NOW(), NOW()),
            (uuid_generate_v4(), 'Study Table', 'furniture', 'Wooden study table with drawers', false, null, true, '{"material": "wood", "drawers": 2}', NOW(), NOW()),
            (uuid_generate_v4(), 'Wardrobe', 'furniture', '3-door wooden wardrobe', false, null, true, '{"doors": 3, "material": "wood"}', NOW(), NOW()),
            (uuid_generate_v4(), 'Ceiling Fan', 'utilities', 'High-speed ceiling fan', true, 180, true, '{"speed": "high", "type": "ceiling"}', NOW(), NOW()),
            (uuid_generate_v4(), 'Bed', 'furniture', 'Single bed with mattress', false, null, true, '{"size": "single", "mattress": "included"}', NOW(), NOW()),
            (uuid_generate_v4(), 'Chair', 'furniture', 'Study chair', false, null, true, '{"type": "office", "adjustable": true}', NOW(), NOW()),
            (uuid_generate_v4(), 'Window', 'utilities', 'Window with curtains', false, null, true, '{"type": "glass", "curtains": true}', NOW(), NOW());
        `);

        // 7. Seed Discount Types
        console.log('💰 Seeding discount types...');
        await client.query(`
            INSERT INTO discount_types (id, name, category, description, default_amount, is_percentage, percentage_value, max_amount, requires_approval, auto_apply, is_active, conditions, created_at, updated_at) VALUES
            (uuid_generate_v4(), 'Academic Excellence', 'academic', 'Discount for students with excellent academic performance', 1000, false, null, null, true, false, true, '{"min_gpa": 3.5}', NOW(), NOW()),
            (uuid_generate_v4(), 'Early Payment', 'early_payment', 'Discount for payments made before due date', null, true, 5.00, 500, false, true, true, '{"days_before_due": 7}', NOW(), NOW()),
            (uuid_generate_v4(), 'Sibling Discount', 'sibling', 'Discount for students with siblings in the hostel', 500, false, null, null, false, false, true, '{"sibling_count": 1}', NOW(), NOW()),
            (uuid_generate_v4(), 'Financial Hardship', 'financial_hardship', 'Need-based financial assistance', 2000, false, null, null, true, false, true, '{"income_threshold": 50000}', NOW(), NOW()),
            (uuid_generate_v4(), 'Loyalty Discount', 'loyalty', 'Discount for long-term residents', null, true, 10.00, 1000, false, false, true, '{"min_months": 12}', NOW(), NOW());
        `);

        // 8. Seed Booking Requests
        console.log('📋 Seeding booking requests...');
        await client.query(`
            INSERT INTO booking_requests (id, name, phone, email, guardian_name, guardian_phone, preferred_room, course, institution, request_date, check_in_date, duration, status, notes, emergency_contact, address, id_proof_type, id_proof_number, priority_score, source, created_at, updated_at) VALUES
            (uuid_generate_v4(), 'Alice Johnson', '9876543240', 'alice.johnson@email.com', 'Robert Johnson', '9876543241', 'Single AC', 'Computer Science', 'Tech University', '2024-01-10', '2024-02-01', '6 months', 'Approved', 'Excellent academic record', '9876543242', '321 Applicant Street, City', 'Aadhar', '123456789014', 85, 'website', NOW(), NOW()),
            (uuid_generate_v4(), 'Bob Wilson', '9876543250', 'bob.wilson@email.com', 'Mary Wilson', '9876543251', 'Double AC', 'Mechanical Engineering', 'Engineering College', '2024-01-12', '2024-02-15', '1 year', 'Pending', 'Waiting for room availability', '9876543252', '654 Applicant Avenue, City', 'Passport', 'P2345678', 75, 'phone', NOW(), NOW()),
            (uuid_generate_v4(), 'Carol Davis', '9876543260', 'carol.davis@email.com', 'John Davis', '9876543261', 'Single Non-AC', 'Business Administration', 'Business College', '2024-01-08', '2024-01-25', '8 months', 'Rejected', 'No rooms available in preferred category', '9876543262', '987 Applicant Road, City', 'Aadhar', '123456789015', 60, 'walk-in', NOW(), NOW());
        `);

        // Get IDs for further seeding
        const students = await client.query('SELECT id, name, email FROM students ORDER BY name');
        const amenities = await client.query('SELECT id, name FROM amenities ORDER BY name');
        const discountTypes = await client.query('SELECT id, name FROM discount_types ORDER BY name');
        const allRooms = await client.query('SELECT id, room_number FROM rooms ORDER BY room_number');

        // 9. Seed Student Contacts
        console.log('📞 Seeding student contacts...');
        if (students.rows.length > 0) {
            const johnDoe = students.rows.find(s => s.name === 'John Doe')?.id;
            const janeSmith = students.rows.find(s => s.name === 'Jane Smith')?.id;
            const mikeJohnson = students.rows.find(s => s.name === 'Mike Johnson')?.id;

            if (johnDoe && janeSmith && mikeJohnson) {
                await client.query(`
                    INSERT INTO student_contacts (id, student_id, type, name, phone, email, relationship, is_primary, is_active, created_at, updated_at) VALUES
                    (uuid_generate_v4(), '${johnDoe}', 'guardian', 'Robert Doe', '9876543211', 'robert.doe@email.com', 'Father', true, true, NOW(), NOW()),
                    (uuid_generate_v4(), '${johnDoe}', 'emergency', 'Sarah Doe', '9876543212', 'sarah.doe@email.com', 'Mother', false, true, NOW(), NOW()),
                    (uuid_generate_v4(), '${janeSmith}', 'guardian', 'Mary Smith', '9876543221', 'mary.smith@email.com', 'Mother', true, true, NOW(), NOW()),
                    (uuid_generate_v4(), '${janeSmith}', 'emergency', 'David Smith', '9876543222', 'david.smith@email.com', 'Father', false, true, NOW(), NOW()),
                    (uuid_generate_v4(), '${mikeJohnson}', 'guardian', 'Lisa Johnson', '9876543231', 'lisa.johnson@email.com', 'Mother', true, true, NOW(), NOW()),
                    (uuid_generate_v4(), '${mikeJohnson}', 'emergency', 'Tom Johnson', '9876543232', 'tom.johnson@email.com', 'Father', false, true, NOW(), NOW());
                `);
            }
        }

        // 10. Seed Student Academic Info
        console.log('🎓 Seeding student academic info...');
        if (students.rows.length > 0) {
            const johnDoe = students.rows.find(s => s.name === 'John Doe')?.id;
            const janeSmith = students.rows.find(s => s.name === 'Jane Smith')?.id;
            const mikeJohnson = students.rows.find(s => s.name === 'Mike Johnson')?.id;

            if (johnDoe && janeSmith && mikeJohnson) {
                await client.query(`
                    INSERT INTO student_academic_info (id, student_id, course, institution, academic_year, semester, start_date, expected_end_date, student_id_number, is_active, created_at, updated_at) VALUES
                    (uuid_generate_v4(), '${johnDoe}', 'Computer Science', 'Tech University', '2023-2024', '6th', '2021-08-01', '2025-05-31', 'CS2021001', true, NOW(), NOW()),
                    (uuid_generate_v4(), '${janeSmith}', 'Business Administration', 'Business College', '2023-2024', '4th', '2022-08-01', '2026-05-31', 'BA2022002', true, NOW(), NOW()),
                    (uuid_generate_v4(), '${mikeJohnson}', 'Mechanical Engineering', 'Engineering College', '2023-2024', '2nd', '2023-08-01', '2027-05-31', 'ME2023003', true, NOW(), NOW());
                `);
            }
        }

        // 11. Seed Student Financial Info
        console.log('💳 Seeding student financial info...');
        if (students.rows.length > 0) {
            const johnDoe = students.rows.find(s => s.name === 'John Doe')?.id;
            const janeSmith = students.rows.find(s => s.name === 'Jane Smith')?.id;
            const mikeJohnson = students.rows.find(s => s.name === 'Mike Johnson')?.id;

            if (johnDoe && janeSmith && mikeJohnson) {
                await client.query(`
                    INSERT INTO student_financial_info (id, student_id, fee_type, amount, effective_from, effective_to, is_active, notes, created_at, updated_at) VALUES
                    (uuid_generate_v4(), '${johnDoe}', 'base_monthly', 8000, '2024-01-01', null, true, 'Monthly room rent', NOW(), NOW()),
                    (uuid_generate_v4(), '${johnDoe}', 'utilities', 500, '2024-01-01', null, true, 'Electricity and water', NOW(), NOW()),
                    (uuid_generate_v4(), '${janeSmith}', 'base_monthly', 8000, '2024-01-01', null, true, 'Monthly room rent', NOW(), NOW()),
                    (uuid_generate_v4(), '${janeSmith}', 'utilities', 500, '2024-01-01', null, true, 'Electricity and water', NOW(), NOW()),
                    (uuid_generate_v4(), '${mikeJohnson}', 'base_monthly', 6000, '2024-01-01', null, true, 'Monthly room rent', NOW(), NOW()),
                    (uuid_generate_v4(), '${mikeJohnson}', 'utilities', 400, '2024-01-01', null, true, 'Electricity and water', NOW(), NOW());
                `);
            }
        }

        // 12. Seed Room Amenities
        console.log('🛏️ Seeding room amenities...');
        if (allRooms.rows.length > 0 && amenities.rows.length > 0) {
            const room101 = allRooms.rows.find(r => r.room_number === '101')?.id;
            const room102 = allRooms.rows.find(r => r.room_number === '102')?.id;
            const room103 = allRooms.rows.find(r => r.room_number === '103')?.id;
            
            const ac = amenities.rows.find(a => a.name === 'Air Conditioning')?.id;
            const wifi = amenities.rows.find(a => a.name === 'WiFi')?.id;
            const table = amenities.rows.find(a => a.name === 'Study Table')?.id;
            const wardrobe = amenities.rows.find(a => a.name === 'Wardrobe')?.id;
            const fan = amenities.rows.find(a => a.name === 'Ceiling Fan')?.id;
            const bed = amenities.rows.find(a => a.name === 'Bed')?.id;

            if (room101 && room102 && room103 && ac && wifi && table && wardrobe && fan && bed) {
                await client.query(`
                    INSERT INTO room_amenities (id, room_id, amenity_id, is_active, installed_date, notes, created_at, updated_at) VALUES
                    -- Room 101 (Single AC)
                    (uuid_generate_v4(), '${room101}', '${ac}', true, '2024-01-01', 'Working condition', NOW(), NOW()),
                    (uuid_generate_v4(), '${room101}', '${wifi}', true, '2024-01-01', 'High speed connection', NOW(), NOW()),
                    (uuid_generate_v4(), '${room101}', '${table}', true, '2024-01-01', 'Good condition', NOW(), NOW()),
                    (uuid_generate_v4(), '${room101}', '${wardrobe}', true, '2024-01-01', 'Spacious', NOW(), NOW()),
                    (uuid_generate_v4(), '${room101}', '${bed}', true, '2024-01-01', 'Comfortable mattress', NOW(), NOW()),
                    -- Room 102 (Single AC)
                    (uuid_generate_v4(), '${room102}', '${ac}', true, '2024-01-01', 'Working condition', NOW(), NOW()),
                    (uuid_generate_v4(), '${room102}', '${wifi}', true, '2024-01-01', 'High speed connection', NOW(), NOW()),
                    (uuid_generate_v4(), '${room102}', '${table}', true, '2024-01-01', 'Good condition', NOW(), NOW()),
                    (uuid_generate_v4(), '${room102}', '${wardrobe}', true, '2024-01-01', 'Spacious', NOW(), NOW()),
                    (uuid_generate_v4(), '${room102}', '${bed}', true, '2024-01-01', 'Comfortable mattress', NOW(), NOW()),
                    -- Room 103 (Single Non-AC)
                    (uuid_generate_v4(), '${room103}', '${fan}', true, '2024-01-01', 'High speed fan', NOW(), NOW()),
                    (uuid_generate_v4(), '${room103}', '${wifi}', true, '2024-01-01', 'High speed connection', NOW(), NOW()),
                    (uuid_generate_v4(), '${room103}', '${table}', true, '2024-01-01', 'Good condition', NOW(), NOW()),
                    (uuid_generate_v4(), '${room103}', '${wardrobe}', true, '2024-01-01', 'Spacious', NOW(), NOW()),
                    (uuid_generate_v4(), '${room103}', '${bed}', true, '2024-01-01', 'Comfortable mattress', NOW(), NOW());
                `);
            }
        }

        // 13. Seed Room Occupants
        console.log('🏠 Seeding room occupants...');
        if (students.rows.length > 0 && allRooms.rows.length > 0) {
            const johnDoe = students.rows.find(s => s.name === 'John Doe')?.id;
            const janeSmith = students.rows.find(s => s.name === 'Jane Smith')?.id;
            const mikeJohnson = students.rows.find(s => s.name === 'Mike Johnson')?.id;
            
            const room101 = allRooms.rows.find(r => r.room_number === '101')?.id;
            const room102 = allRooms.rows.find(r => r.room_number === '102')?.id;
            const room103 = allRooms.rows.find(r => r.room_number === '103')?.id;

            if (johnDoe && janeSmith && mikeJohnson && room101 && room102 && room103) {
                await client.query(`
                    INSERT INTO room_occupants (id, room_id, student_id, check_in_date, check_out_date, bed_number, status, notes, assigned_by, created_at, updated_at) VALUES
                    (uuid_generate_v4(), '${room101}', '${johnDoe}', '2024-01-15', null, '1', 'Active', 'Primary occupant', 'admin', NOW(), NOW()),
                    (uuid_generate_v4(), '${room102}', '${janeSmith}', '2024-01-20', null, '1', 'Active', 'Primary occupant', 'admin', NOW(), NOW()),
                    (uuid_generate_v4(), '${room103}', '${mikeJohnson}', '2024-02-01', null, '1', 'Active', 'Primary occupant', 'admin', NOW(), NOW());
                `);
            }
        }

        // 14. Seed Invoices
        console.log('🧾 Seeding invoices...');
        if (students.rows.length > 0) {
            const johnDoe = students.rows.find(s => s.name === 'John Doe')?.id;
            const janeSmith = students.rows.find(s => s.name === 'Jane Smith')?.id;
            const mikeJohnson = students.rows.find(s => s.name === 'Mike Johnson')?.id;

            if (johnDoe && janeSmith && mikeJohnson) {
                await client.query(`
                    INSERT INTO invoices (id, student_id, month, total, status, due_date, subtotal, discount_total, payment_total, notes, invoice_number, generated_by, created_at, updated_at) VALUES
                    (uuid_generate_v4(), '${johnDoe}', '2024-01', 8500, 'Paid', '2024-01-31', 8500, 0, 8500, 'January 2024 charges', 'INV-2024-001', 'system', NOW(), NOW()),
                    (uuid_generate_v4(), '${johnDoe}', '2024-02', 8500, 'Paid', '2024-02-29', 8500, 0, 8500, 'February 2024 charges', 'INV-2024-002', 'system', NOW(), NOW()),
                    (uuid_generate_v4(), '${janeSmith}', '2024-01', 8500, 'Partially Paid', '2024-01-31', 8500, 0, 5000, 'January 2024 charges', 'INV-2024-003', 'system', NOW(), NOW()),
                    (uuid_generate_v4(), '${janeSmith}', '2024-02', 8500, 'Unpaid', '2024-02-29', 8500, 0, 0, 'February 2024 charges', 'INV-2024-004', 'system', NOW(), NOW()),
                    (uuid_generate_v4(), '${mikeJohnson}', '2024-02', 6400, 'Paid', '2024-02-29', 6400, 0, 6400, 'February 2024 charges', 'INV-2024-005', 'system', NOW(), NOW());
                `);
            }
        }

        // 15. Seed Invoice Items
        console.log('📋 Seeding invoice items...');
        const invoices = await client.query('SELECT id, student_id, month FROM invoices ORDER BY month, student_id');
        
        if (invoices.rows.length > 0) {
            for (const invoice of invoices.rows) {
                const student = students.rows.find(s => s.id === invoice.student_id);
                if (student) {
                    let roomRent = 8000;
                    let utilities = 500;
                    
                    if (student.name === 'Mike Johnson') {
                        roomRent = 6000;
                        utilities = 400;
                    }

                    await client.query(`
                        INSERT INTO invoice_items (id, invoice_id, description, amount, category, quantity, unit_price, tax_rate, tax_amount, is_taxable, created_at, updated_at) VALUES
                        (uuid_generate_v4(), '${invoice.id}', 'Room Rent - ${invoice.month}', ${roomRent}, 'Accommodation', 1, ${roomRent}, 0, 0, false, NOW(), NOW()),
                        (uuid_generate_v4(), '${invoice.id}', 'Utilities - ${invoice.month}', ${utilities}, 'Utilities', 1, ${utilities}, 0, 0, false, NOW(), NOW());
                    `);
                }
            }
        }

        // 16. Seed Payments
        console.log('💰 Seeding payments...');
        if (students.rows.length > 0) {
            const johnDoe = students.rows.find(s => s.name === 'John Doe')?.id;
            const janeSmith = students.rows.find(s => s.name === 'Jane Smith')?.id;
            const mikeJohnson = students.rows.find(s => s.name === 'Mike Johnson')?.id;

            if (johnDoe && janeSmith && mikeJohnson) {
                await client.query(`
                    INSERT INTO payments (id, student_id, amount, payment_method, payment_date, reference, notes, status, transaction_id, receipt_number, processed_by, created_at, updated_at) VALUES
                    (uuid_generate_v4(), '${johnDoe}', 8500, 'UPI', '2024-01-05', 'UPI-REF-001', 'January payment', 'Completed', 'TXN001', 'RCP001', 'admin', NOW(), NOW()),
                    (uuid_generate_v4(), '${johnDoe}', 8500, 'Bank Transfer', '2024-02-03', 'NEFT-REF-002', 'February payment', 'Completed', 'TXN002', 'RCP002', 'admin', NOW(), NOW()),
                    (uuid_generate_v4(), '${janeSmith}', 5000, 'Cash', '2024-01-10', 'CASH-REF-003', 'Partial January payment', 'Completed', 'TXN003', 'RCP003', 'admin', NOW(), NOW()),
                    (uuid_generate_v4(), '${mikeJohnson}', 6400, 'UPI', '2024-02-05', 'UPI-REF-004', 'February payment', 'Completed', 'TXN004', 'RCP004', 'admin', NOW(), NOW());
                `);
            }
        }

        // 17. Seed Payment Invoice Allocations
        console.log('🔗 Seeding payment invoice allocations...');
        const payments = await client.query('SELECT id, student_id, amount FROM payments ORDER BY created_at');
        
        if (payments.rows.length > 0 && invoices.rows.length > 0) {
            for (const payment of payments.rows) {
                const matchingInvoice = invoices.rows.find(inv => inv.student_id === payment.student_id);
                if (matchingInvoice) {
                    await client.query(`
                        INSERT INTO payment_invoice_allocations (id, payment_id, invoice_id, allocated_amount, allocation_date, allocated_by, notes, created_at, updated_at) VALUES
                        (uuid_generate_v4(), '${payment.id}', '${matchingInvoice.id}', ${payment.amount}, CURRENT_DATE, 'system', 'Auto allocation', NOW(), NOW());
                    `);
                }
            }
        }

        // 18. Seed Discounts
        console.log('🎁 Seeding discounts...');
        if (students.rows.length > 0 && discountTypes.rows.length > 0) {
            const johnDoe = students.rows.find(s => s.name === 'John Doe')?.id;
            const academicDiscount = discountTypes.rows.find(dt => dt.name === 'Academic Excellence')?.id;
            const earlyPayment = discountTypes.rows.find(dt => dt.name === 'Early Payment')?.id;

            if (johnDoe && academicDiscount && earlyPayment) {
                await client.query(`
                    INSERT INTO discounts (id, student_id, discount_type_id, amount, reason, notes, applied_by, date, status, applied_to, valid_from, valid_to, is_percentage, percentage_value, max_amount, reference_id, created_at, updated_at) VALUES
                    (uuid_generate_v4(), '${johnDoe}', '${academicDiscount}', 1000, 'Excellent academic performance in previous semester', 'GPA: 3.8', 'admin', '2024-01-01', 'active', 'ledger', '2024-01-01', '2024-12-31', false, null, null, null, NOW(), NOW()),
                    (uuid_generate_v4(), '${johnDoe}', '${earlyPayment}', 425, 'Early payment discount for February', '5% discount on total amount', 'system', '2024-02-03', 'used', 'payment', '2024-02-01', '2024-02-29', true, 5.00, 500, null, NOW(), NOW());
                `);
            }
        }

        // 19. Seed Ledger Entries
        console.log('📚 Seeding ledger entries...');
        if (students.rows.length > 0) {
            const johnDoe = students.rows.find(s => s.name === 'John Doe')?.id;
            const janeSmith = students.rows.find(s => s.name === 'Jane Smith')?.id;
            const mikeJohnson = students.rows.find(s => s.name === 'Mike Johnson')?.id;

            if (johnDoe && janeSmith && mikeJohnson) {
                await client.query(`
                    INSERT INTO ledger_entries (id, student_id, date, type, description, reference_id, debit, credit, balance, balance_type, notes, entry_number, is_reversed, created_at, updated_at) VALUES
                    -- John Doe entries
                    (uuid_generate_v4(), '${johnDoe}', '2024-01-01', 'Invoice', 'January 2024 charges', null, 8500, 0, 8500, 'Dr', 'Monthly charges', 1, false, NOW(), NOW()),
                    (uuid_generate_v4(), '${johnDoe}', '2024-01-05', 'Payment', 'Payment received - UPI', null, 0, 8500, 0, 'Nil', 'Full payment', 2, false, NOW(), NOW()),
                    (uuid_generate_v4(), '${johnDoe}', '2024-02-01', 'Invoice', 'February 2024 charges', null, 8500, 0, 8500, 'Dr', 'Monthly charges', 3, false, NOW(), NOW()),
                    (uuid_generate_v4(), '${johnDoe}', '2024-02-03', 'Payment', 'Payment received - Bank Transfer', null, 0, 8500, 0, 'Nil', 'Full payment', 4, false, NOW(), NOW()),
                    -- Jane Smith entries
                    (uuid_generate_v4(), '${janeSmith}', '2024-01-01', 'Invoice', 'January 2024 charges', null, 8500, 0, 8500, 'Dr', 'Monthly charges', 1, false, NOW(), NOW()),
                    (uuid_generate_v4(), '${janeSmith}', '2024-01-10', 'Payment', 'Partial payment received - Cash', null, 0, 5000, 3500, 'Dr', 'Partial payment', 2, false, NOW(), NOW()),
                    (uuid_generate_v4(), '${janeSmith}', '2024-02-01', 'Invoice', 'February 2024 charges', null, 8500, 0, 12000, 'Dr', 'Monthly charges', 3, false, NOW(), NOW()),
                    -- Mike Johnson entries
                    (uuid_generate_v4(), '${mikeJohnson}', '2024-02-01', 'Invoice', 'February 2024 charges', null, 6400, 0, 6400, 'Dr', 'Monthly charges', 1, false, NOW(), NOW()),
                    (uuid_generate_v4(), '${mikeJohnson}', '2024-02-05', 'Payment', 'Payment received - UPI', null, 0, 6400, 0, 'Nil', 'Full payment', 2, false, NOW(), NOW());
                `);
            }
        }

        // 20. Seed Reports
        console.log('📊 Seeding reports...');
        await client.query(`
            INSERT INTO reports (id, name, type, description, generated_by, generated_at, parameters, data, format, file_path, file_size, status, is_scheduled, execution_time_ms, download_count, expires_at, created_at, updated_at) VALUES
            (uuid_generate_v4(), 'Monthly Financial Report - January 2024', 'financial', 'Complete financial overview for January 2024', 'admin', '2024-02-01 09:00:00', '{"month": "2024-01", "include_payments": true, "include_outstanding": true}', '{"total_revenue": 25500, "total_outstanding": 3500, "payment_methods": {"UPI": 8500, "Cash": 5000, "Bank Transfer": 8500}}', 'pdf', '/reports/financial_2024_01.pdf', '2.5 MB', 'completed', false, 1250, 3, '2024-05-01 00:00:00', NOW(), NOW()),
            (uuid_generate_v4(), 'Student Ledger Report - All Active', 'ledger', 'Ledger summary for all active students', 'admin', '2024-02-15 14:30:00', '{"status": "active", "date_range": {"from": "2024-01-01", "to": "2024-02-15"}}', '{"total_students": 3, "total_debit": 31900, "total_credit": 28400, "net_outstanding": 3500}', 'excel', '/reports/ledger_active_students.xlsx', '1.8 MB', 'completed', false, 890, 1, '2024-05-15 00:00:00', NOW(), NOW()),
            (uuid_generate_v4(), 'Room Occupancy Report', 'occupancy', 'Current room occupancy status', 'system', '2024-02-20 08:00:00', '{"building": "all", "include_maintenance": false}', '{"total_rooms": 5, "occupied_rooms": 3, "occupancy_rate": 60, "available_rooms": 2}', 'json', '/reports/occupancy_2024_02_20.json', '0.5 MB', 'completed', true, 450, 0, '2024-03-20 00:00:00', NOW(), NOW());
        `);

        console.log('✅ Database seeding completed successfully!');
        console.log('📊 Comprehensive seeded data:');
        console.log('   🏢 2 Buildings (Main Building, Annex Building)');
        console.log('   🏠 5 Room Types (Single AC/Non-AC, Double AC/Non-AC, Triple Sharing)');
        console.log('   🚪 5 Sample Rooms (101, 102, 103, 201, 202)');
        console.log('   🛋️  8 Amenities (AC, WiFi, Furniture, etc.)');
        console.log('   💰 5 Discount Types (Academic, Early Payment, etc.)');
        console.log('   📋 3 Booking Requests (Various statuses)');
        console.log('   👥 3 Students (John Doe, Jane Smith, Mike Johnson)');
        console.log('   📞 6 Student Contacts (Parents/Guardians)');
        console.log('   🎓 3 Academic Info Records');
        console.log('   💳 6 Financial Info Records');
        console.log('   🛏️  15 Room Amenity Assignments');
        console.log('   🏠 3 Room Occupant Records');
        console.log('   🧾 5 Invoices (Various statuses)');
        console.log('   📋 10 Invoice Items');
        console.log('   💰 4 Payments (Different methods)');
        console.log('   🔗 4 Payment-Invoice Allocations');
        console.log('   🎁 2 Discounts');
        console.log('   📚 9 Ledger Entries');
        console.log('   📊 3 Sample Reports');
        console.log('');
        console.log('🎯 Total: 20 tables seeded with comprehensive test data!');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    } finally {
        await client.end();
        console.log('🔌 Database connection closed');
    }
}

// Run the seeding function
if (require.main === module) {
    seedDatabase()
        .then(() => {
            console.log('🎉 Seeding process completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Seeding process failed:', error);
            process.exit(1);
        });
}

module.exports = { seedDatabase };
        