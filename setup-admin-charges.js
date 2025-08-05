const { DataSource } = require('typeorm');
const fs = require('fs');
const path = require('path');

// Database configuration
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'kaha_hostel_db',
  synchronize: false,
  logging: true,
});

async function setupAdminCharges() {
  try {
    console.log('🔄 Connecting to database...');
    await dataSource.initialize();
    console.log('✅ Connected to database');

    console.log('🔄 Reading SQL file...');
    const sqlFile = path.join(__dirname, 'create-admin-charges-tables.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    console.log('🔄 Executing SQL commands...');
    
    // Split SQL into individual commands and execute them
    const commands = sql.split(';').filter(cmd => cmd.trim().length > 0);
    
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i].trim();
      if (command) {
        try {
          console.log(`Executing command ${i + 1}/${commands.length}...`);
          await dataSource.query(command);
        } catch (error) {
          if (error.message.includes('already exists') || error.message.includes('does not exist')) {
            console.log(`⚠️  Command ${i + 1} skipped (already exists or not needed)`);
          } else {
            console.error(`❌ Error in command ${i + 1}:`, error.message);
          }
        }
      }
    }

    console.log('✅ Admin charges setup completed!');
    
    // Verify tables were created
    console.log('🔍 Verifying tables...');
    const chargeTypesCount = await dataSource.query('SELECT COUNT(*) FROM charge_types');
    const adminChargesCount = await dataSource.query('SELECT COUNT(*) FROM admin_charges');
    
    console.log(`✅ charge_types table: ${chargeTypesCount[0].count} records`);
    console.log(`✅ admin_charges table: ${adminChargesCount[0].count} records`);
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    await dataSource.destroy();
    console.log('🔄 Database connection closed');
  }
}

setupAdminCharges();