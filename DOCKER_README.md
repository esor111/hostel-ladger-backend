# 🐳 Kaha Hostel NestJS API - Docker Compose Setup

## Prerequisites

1. **PostgreSQL Database Running**: Make sure your PostgreSQL database is running on your host machine
   - Host: `localhost` (accessible as `host.docker.internal` from Docker)
   - Port: `5432`
   - Database: `kaha_hostel_db`
   - Username: `root`
   - Password: `root`

2. **Docker & Docker Compose**: Ensure Docker and Docker Compose are installed

## 🚀 Quick Start

```bash
# Start the API in development mode (with logs)
npm run docker:dev

# Or start in background
npm run docker:up

# View logs
npm run docker:logs

# Stop the container
npm run docker:down
```

## 🔧 Configuration

### Environment Variables

The Docker container uses these environment variables:

```env
NODE_ENV=production
PORT=3012
DB_HOST=host.docker.internal  # Connects to host PostgreSQL
DB_PORT=5432
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=kaha_hostel_db
```

### Database Connection

The container connects to PostgreSQL running on your host machine using:
- `host.docker.internal` - Special Docker hostname that resolves to host machine
- `host-gateway` - Docker networking feature for host access

## 📊 Health Check

The API includes a health check endpoint:

```bash
# Check if API is healthy
curl http://localhost:3012/health

# Expected response:
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    }
  }
}
```

## 🧪 Testing the API

Once the container is running, test the API:

```bash
# Test basic endpoint
curl http://localhost:3012/api/v1/students

# Test admin charges
curl http://localhost:3012/api/v1/admin/charge-types

# Test discounts
curl http://localhost:3012/api/v1/discounts
```

## 📝 Logs

View container logs:

```bash
# Follow logs
docker-compose logs -f kaha-hostel-api

# Or using Docker directly
docker logs -f kaha-hostel-api
```

## 🔄 Database Migrations

The container automatically runs database migrations on startup. If you need to run them manually:

```bash
# Enter the container
docker exec -it kaha-hostel-api sh

# Run migrations
npm run migration:run
```

## 🛠 Troubleshooting

### Container won't start
1. Check if PostgreSQL is running on host: `netstat -an | grep 5432`
2. Verify database credentials in docker-compose.yml
3. Check container logs: `docker-compose logs kaha-hostel-api`

### Database connection issues
1. Ensure PostgreSQL accepts connections from Docker containers
2. Check PostgreSQL configuration (`postgresql.conf` and `pg_hba.conf`)
3. Verify firewall settings

### Port conflicts
If port 3012 is already in use, change it in docker-compose.yml:
```yaml
ports:
  - "3013:3012"  # Use port 3013 instead
```

## 🚀 Production Deployment

For production deployment:

1. **Update environment variables** in docker-compose.yml
2. **Use proper secrets management** (Docker secrets, Kubernetes secrets)
3. **Configure reverse proxy** (Nginx, Traefik)
4. **Set up monitoring** (health checks, logging)
5. **Configure backup strategy** for database

## 📋 Available Scripts

```bash
npm run docker:build    # Build Docker image
npm run docker:run      # Start with docker-compose
npm run docker:stop     # Stop containers
npm run docker:logs     # View logs
```

## 🎯 API Endpoints

Once running, the API will be available at:
- **Base URL**: `http://localhost:3012/api/v1`
- **Health Check**: `http://localhost:3012/health`
- **Swagger Docs**: `http://localhost:3012/api` (if enabled)

### Main Endpoints:
- `GET /api/v1/students` - Student management
- `GET /api/v1/admin/charges` - Admin charges
- `GET /api/v1/discounts` - Discount management
- `GET /api/v1/payments` - Payment processing
- `GET /api/v1/rooms` - Room management
- `GET /api/v1/ledger` - Ledger entries

Your NestJS API is now containerized and ready for deployment! 🚀