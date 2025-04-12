# Complete Deployment Guide

## Frontend Deployment (Vercel)

### 1. Preparation:
```bash
cd frontend
npm install
```

### 2. Create vercel.json:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    {
      "src": "/(.*)", 
      "dest": "/dist/$1"
    }
  ]
}
```

### 3. Deploy to Vercel:
```bash
npm install -g vercel
vercel login
vercel --prod
```

## Backend Deployment (Railway)

### 1. Preparation:
```bash
cd backend
npm install
```

### 2. Create railway.json:
```json
{
  "builds": [
    {
      "src": "package.json", 
      "use": "@railway/node"
    }
  ]
}
```

### 3. Required Environment Variables:
```
PORT=3000
DATABASE_URL=mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_password
```

### 4. Deploy to Railway:
```bash
npm install -g railway
railway login
railway up
```

## Post-Deployment

1. Get backend URL from Railway dashboard
2. Update frontend's API endpoints
3. Redeploy frontend:
```bash
cd frontend
vercel --prod
```

## Troubleshooting

1. Build failures:
   - Check error logs in Vercel/Railway
   - Verify all dependencies in package.json

2. Connection issues:
   - Verify CORS settings in backend
   - Check network requests in browser console

3. Database problems:
   - Verify connection string
   - Check database permissions
