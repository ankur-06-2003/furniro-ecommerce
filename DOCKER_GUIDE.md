# Furniro E-Commerce - Docker Deployment Guide

## Quick Start with Docker Compose

### Prerequisites
- Docker installed and running
- Docker Compose installed

### Build and Run

```bash
# Build and start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

### Services
- **Frontend** → http://localhost:3000
- **Backend API** → http://localhost:8000
- **MongoDB** → localhost:27017

### Logs
```bash
# View all logs
docker-compose logs -f

# View specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (clears database)
docker-compose down -v
```

---

## What Happens on Startup

1. **MongoDB starts** and initializes database
2. **Backend waits** for MongoDB to be healthy
3. **Backend seeds** the database with products, categories, and users
4. **Backend starts** on port 8000
5. **Frontend starts** on port 3000

---

## Environment Variables

### Backend (.env)
All environment variables are configured in `docker-compose.yml`. To customize:
- Edit the `environment` section in `docker-compose.yml`
- Or create a `.env.production` file

### Frontend (.env)
Frontend environment variables are set in `docker-compose.yml`:
- `NEXT_PUBLIC_BASE_URL` - Backend API base URL
- `NEXT_PUBLIC_API_URL` - Backend API URL with `/api`

---

## Build Individual Services

### Build Backend Image Only
```bash
cd backend
docker build -f dockerfile -t furniro-backend:latest .
```

### Build Frontend Image Only
```bash
cd frontend
docker build -f dockerfile -t furniro-frontend:latest .
```

---

## Database Seeding

The backend automatically seeds MongoDB with:
- **6 Categories** (Sofas, Dining, Beds, Chairs, Storage, Lighting)
- **18 Products** (3 per category with prices and stock)
- **4 Users** (1 admin + 3 customers)

**Credentials for Testing:**
```
Admin:    admin@furniro.com / password123
Customer: john@example.com / password123
```

---

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB container is running: `docker-compose ps`
- Check MongoDB logs: `docker-compose logs mongodb`
- Wait 10-15 seconds for MongoDB to initialize

### Port Already in Use
```bash
# Change ports in docker-compose.yml or
# Kill existing processes
lsof -i :3000  # Frontend
lsof -i :8000  # Backend
lsof -i :27017 # MongoDB
```

### Database Not Seeding
- Check backend logs: `docker-compose logs backend`
- Manually seed: `docker-compose exec backend npm run seed`
- Verify MongoDB connection

---

## Production Deployment

For production deployment:

1. Update environment variables in `docker-compose.yml`
2. Use production MongoDB URL (MongoDB Atlas, etc.)
3. Set secure JWT_SECRET
4. Enable HTTPS/SSL
5. Use environment-specific configuration

Example for production:
```yaml
environment:
  - NODE_ENV=production
  - MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/furniro
  - JWT_SECRET=your-secure-secret-key
  - FRONTEND_URL=https://yourdomain.com
```

---

## Kubernetes Deployment

For Kubernetes, refer to the manifests in `Kubernetes-Manifests-file/`:
- Backend deployment
- Frontend deployment
- MongoDB deployment
- Services and ingress

---

## Docker Network

All services communicate through the `furniro-network` bridge network:
- Backend connects to MongoDB at `mongodb://mongodb:27017`
- Frontend connects to Backend at `http://backend:8000`

---

## Volumes

MongoDB data is persisted in the `mongodb_data` volume:
```bash
# Clear database (removes volume)
docker-compose down -v
```

---

## Support

For issues:
1. Check logs: `docker-compose logs -f`
2. Verify services: `docker-compose ps`
3. Inspect containers: `docker ps -a`

---

**Last Updated:** January 25, 2026
