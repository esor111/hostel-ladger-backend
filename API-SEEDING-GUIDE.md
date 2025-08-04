# 🌱 Database Seeding Guide

This guide explains how to seed the NestJS Hostel Management System database with sample data using the direct PostgreSQL seeding scripts.

## 🚀 Quick Start

### 1. Prerequisites
- PostgreSQL database running
- Environment variables configured in `.env`
- Database schema created (run migrations first)

### 2. Seed All Data at Once
```bash
# Using the direct seeding script
node seed-database.js
```

### 3. Clear All Data
```bash
# Using the direct clearing script
node clear-all-data.js
```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `seed-database.js` | Seeds all entities with sample data in correct dependency order |
| `clear-all-data.js` | Clears all seeded data in reverse dependency order |

## 🔧 Usage Examples

### Seeding Data
```bash
# Seed all data (checks if data exists first)
node seed-database.js

# The script will automatically:
# - Check if data already exists
# - Skip seeding if data is present
# - Seed all entities in proper dependency order
```

### Clearing Data
```bash
# Clear all seeded data
node clear-all-data.js

# This will remove all data in proper order to avoid foreign key conflicts
```

## 📊 What Gets Seeded

The seeding script creates sample data for:

1. **Buildings** - Main Building and Annex Building
2. **Room Types** - Single AC, Single Non-AC, Double AC, etc.
3. **Amenities** - AC, WiFi, Study Table, Wardrobe, etc.
4. **Rooms** - 50+ rooms across different floors and types
5. **Students** - Sample students with contact and academic info
6. **Room Occupants** - Student-room assignments
7. **Discount Types** - Various discount categories
8. **Invoices** - Monthly billing records
9. **Payments** - Payment transactions
10. **Payment Allocations** - Payment-invoice mappings
11. **Discounts** - Applied discounts
12. **Ledger Entries** - Financial ledger records
13. **Booking Requests** - Sample booking applications

## 🔄 Dependency Order

The seeding follows this dependency order:
1. Independent entities: Buildings, Room Types, Amenities, Discount Types
2. Rooms (depends on Buildings, Room Types)
3. Students (depends on Rooms)
4. Room Occupants (depends on Students, Rooms)
5. Financial entities: Invoices, Payments, Payment Allocations
6. Discounts (depends on Students, Discount Types)
7. Ledger Entries (depends on all financial entities)
8. Booking Requests (independent)

## 🛠️ Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your `.env` file configuration
   - Ensure PostgreSQL is running
   - Verify database credentials

2. **Data Already Exists**
   - The seed script checks for existing data
   - Use `clear-all-data.js` first if you want to reseed

3. **Foreign Key Errors**
   - Ensure you run migrations first
   - The scripts handle dependency order automatically

### Environment Variables
Make sure these are set in your `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=kaha_hostel_db
```

## 📝 Notes

- The seeding scripts use direct PostgreSQL queries for better performance
- Data is created with realistic relationships and constraints
- UUIDs are generated automatically for all entities
- Scripts include comprehensive logging for debugging
- Both scripts handle errors gracefully and provide clear feedback

## 🎯 Next Steps

After seeding:
1. Start your NestJS application: `npm run start:dev`
2. Test the API endpoints with the seeded data
3. Use the analytics and reporting features with sample data
4. Explore the admin dashboard with populated data