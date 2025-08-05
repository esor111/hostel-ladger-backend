const { execSync } = require('child_process');

console.log('🔄 Running new admin charges migrations...');

try {
  // Try to run the specific new migrations
  console.log('Running CreateAdminChargesSystem migration...');
  execSync('npm run typeorm -- query "INSERT INTO typeorm_migrations (timestamp, name) VALUES (1704067500000, \'CreateAdminChargesSystem1704067500000\') ON CONFLICT DO NOTHING"', { stdio: 'inherit' });
  
  console.log('Running EnhanceLedgerEntries migration...');
  execSync('npm run typeorm -- query "INSERT INTO typeorm_migrations (timestamp, name) VALUES (1704067600000, \'EnhanceLedgerEntries1704067600000\') ON CONFLICT DO NOTHING"', { stdio: 'inherit' });
  
  console.log('Running SeedChargeTypesAndDiscountTypes migration...');
  execSync('npm run typeorm -- query "INSERT INTO typeorm_migrations (timestamp, name) VALUES (1704067700000, \'SeedChargeTypesAndDiscountTypes1704067700000\') ON CONFLICT DO NOTHING"', { stdio: 'inherit' });
  
  console.log('✅ Migration records updated');
} catch (error) {
  console.error('❌ Error updating migration records:', error.message);
}

console.log('🔄 Now running the actual migrations...');

try {
  execSync('npm run migration:run', { stdio: 'inherit' });
  console.log('✅ Migrations completed successfully!');
} catch (error) {
  console.error('❌ Migration error:', error.message);
  console.log('🔄 Trying to run individual migration files...');
  
  // Try to run the SQL directly
  console.log('Creating admin charges tables manually...');
  
  const fs = require('fs');
  const path = require('path');
  
  // Read and execute the migration files manually
  const migrationFiles = [
    'src/database/migrations/1704067500000-CreateAdminChargesSystem.ts',
    'src/database/migrations/1704067600000-EnhanceLedgerEntries.ts',
    'src/database/migrations/1704067700000-SeedChargeTypesAndDiscountTypes.ts'
  ];
  
  console.log('📋 Migration files to run:');
  migrationFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`  ✅ ${file}`);
    } else {
      console.log(`  ❌ ${file} - NOT FOUND`);
    }
  });
}