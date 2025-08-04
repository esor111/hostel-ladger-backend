const { Client } = require('pg');
require('dotenv').config();

async function clearAllData() {
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

        console.log('🧹 Clearing all seed data in dependency order...');
        
        // Clear in reverse dependency order to avoid foreign key errors
        await client.query('DELETE FROM reports;');
        console.log('   - Cleared reports');
        
        await client.query('DELETE FROM ledger_entries;');
        console.log('   - Cleared ledger entries');
        
        await client.query('DELETE FROM discounts;');
        console.log('   - Cleared discounts');
        
        await client.query('DELETE FROM payment_invoice_allocations;');
        console.log('   - Cleared payment invoice allocations');
        
        await client.query('DELETE FROM payments;');
        console.log('   - Cleared payments');
        
        await client.query('DELETE FROM invoice_items;');
        console.log('   - Cleared invoice items');
        
        await client.query('DELETE FROM invoices;');
        console.log('   - Cleared invoices');
        
        await client.query('DELETE FROM room_occupants;');
        console.log('   - Cleared room occupants');
        
        await client.query('DELETE FROM room_layouts;');
        console.log('   - Cleared room layouts');
        
        await client.query('DELETE FROM room_amenities;');
        console.log('   - Cleared room amenities');
        
        await client.query('DELETE FROM student_financial_info;');
        console.log('   - Cleared student financial info');
        
        await client.query('DELETE FROM student_academic_info;');
        console.log('   - Cleared student academic info');
        
        await client.query('DELETE FROM student_contacts;');
        console.log('   - Cleared student contacts');
        
        await client.query('DELETE FROM students;');
        console.log('   - Cleared students');
        
        await client.query('DELETE FROM booking_requests;');
        console.log('   - Cleared booking requests');
        
        await client.query('DELETE FROM rooms;');
        console.log('   - Cleared rooms');
        
        await client.query('DELETE FROM discount_types;');
        console.log('   - Cleared discount types');
        
        await client.query('DELETE FROM amenities;');
        console.log('   - Cleared amenities');
        
        await client.query('DELETE FROM room_types;');
        console.log('   - Cleared room types');
        
        await client.query('DELETE FROM buildings;');
        console.log('   - Cleared buildings');

        console.log('✅ All seed data cleared successfully!');

    } catch (error) {
        console.error('❌ Error clearing data:', error);
        throw error;
    } finally {
        await client.end();
        console.log('🔌 Database connection closed');
    }
}

clearAllData()
    .then(() => {
        console.log('🎉 Data clearing completed');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Data clearing failed:', error);
        process.exit(1);
    });