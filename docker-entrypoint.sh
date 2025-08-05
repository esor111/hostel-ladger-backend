#!/bin/bash
set -e

echo "🐳 Starting Kaha Hostel NestJS API..."

# Wait for database to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
until nc -z $DB_HOST $DB_PORT; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 2
done

echo "✅ PostgreSQL is ready!"

# Run database setup if needed
echo "🔄 Setting up database..."
if [ "$NODE_ENV" = "production" ]; then
  echo "📊 Running database migrations..."
  npm run migration:run || echo "⚠️ Migrations may have already been run"
fi

echo "🚀 Starting NestJS application..."
exec "$@"