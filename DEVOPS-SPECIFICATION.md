# Disrupt Website - DevOps Environment Specification

## Overview

This document provides the complete specification for setting up the Disrupt Inc. website infrastructure using **Node.js** (no PHP). The deployment will be automated via GitHub Actions on commits to the main branch.

---

## Source Code Repository

| Item              | Value                                              |
|-------------------|----------------------------------------------------|
| **Repository**    | https://github.com/Spilno-me/disrupt-website-v2    |
| **Organization**  | Spilno-me                                          |
| **Branch**        | `main` (production deployment branch)              |
| **Dev Branch**    | `develop` (integration/staging branch)             |
| **Clone Command** | `git clone https://github.com/Spilno-me/disrupt-website-v2.git` |

### Repository Access
- Request access from the organization admin if needed
- GitHub Actions workflows are located in `.github/workflows/`
- Secrets must be configured in: Repository → Settings → Secrets and variables → Actions

### Version Tags
| Tag | Description |
|-----|-------------|
| `v1-launching-soon` | Archived "Launching Soon" website |
| `v2.x.x` | New website versions (current development) |

---

## 1. Target Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRODUCTION SERVER                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐     ┌────────────────────────────────┐    │
│  │  Nginx (Proxy)  │────▶│  Node.js Backend (Express)     │    │
│  │   Port 80/443   │     │  Port 3001                     │    │
│  │                 │     │  - /api/health                 │    │
│  │  Static Files   │     │  - /api/send-email             │    │
│  │  React SPA      │     │  - Nodemailer (SMTP)           │    │
│  └─────────────────┘     └────────────────────────────────┘    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  PM2 Process Manager                    │   │
│  │  - Auto-restart on crash                                │   │
│  │  - Log management                                       │   │
│  │  - Cluster mode (optional)                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Server Requirements

### Hardware/VM Specifications
| Resource | Minimum | Recommended |
|----------|---------|-------------|
| CPU      | 1 vCPU  | 2 vCPU      |
| RAM      | 1 GB    | 2 GB        |
| Storage  | 20 GB   | 40 GB SSD   |
| OS       | Ubuntu 22.04 LTS or 24.04 LTS |

### Software Stack
| Component       | Version   | Purpose                          |
|-----------------|-----------|----------------------------------|
| Node.js         | 22.x LTS  | Runtime for backend & build      |
| npm             | 10.x+     | Package manager                  |
| PM2             | Latest    | Process manager for Node.js      |
| Nginx           | Latest    | Reverse proxy & static files     |
| Git             | Latest    | Deployment from GitHub           |
| Certbot         | Latest    | SSL certificates (Let's Encrypt) |

---

## 3. Server Setup Instructions

### 3.1 Install Node.js 22.x
```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

# Install Node.js
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should output v22.x.x
npm --version   # Should output 10.x.x
```

### 3.2 Install PM2 (Process Manager)
```bash
sudo npm install -g pm2

# Setup PM2 to start on boot
pm2 startup systemd
# Run the command it outputs
```

### 3.3 Install Nginx
```bash
sudo apt-get update
sudo apt-get install -y nginx

# Enable and start Nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 3.4 Install Certbot for SSL
```bash
sudo apt-get install -y certbot python3-certbot-nginx
```

---

## 4. Directory Structure on Server

```
/var/www/disruptinc.io/
├── frontend/                 # React static build files
│   ├── index.html
│   ├── assets/
│   └── ...
├── backend/                  # Node.js API server
│   ├── package.json
│   ├── server.js            # Main entry point
│   ├── routes/
│   │   └── email.js         # Email API routes
│   ├── services/
│   │   └── emailService.js  # Nodemailer service
│   ├── node_modules/
│   └── .env                 # Environment variables (generated)
└── logs/                    # Application logs
    ├── app.log
    └── error.log
```

---

## 5. Nginx Configuration

Create `/etc/nginx/sites-available/disruptinc.io`:

```nginx
server {
    listen 80;
    server_name disruptinc.io www.disruptinc.io;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name disruptinc.io www.disruptinc.io;

    # SSL Configuration (managed by Certbot)
    ssl_certificate /etc/letsencrypt/live/disruptinc.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/disruptinc.io/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Frontend static files
    root /var/www/disruptinc.io/frontend;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;

    # API reverse proxy to Node.js backend
    location /api/ {
        proxy_pass http://127.0.0.1:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90s;
    }

    # SPA fallback - serve index.html for all non-file routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/disruptinc.io /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default site
sudo nginx -t  # Test configuration
sudo systemctl reload nginx
```

---

## 6. SSL Certificate Setup

```bash
# Obtain SSL certificate
sudo certbot --nginx -d disruptinc.io -d www.disruptinc.io

# Verify auto-renewal
sudo certbot renew --dry-run
```

---

## 7. Node.js Backend Specification

### 7.1 Backend Dependencies (package.json)
```json
{
  "name": "disrupt-backend",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "nodemailer": "^6.9.7",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "zod": "^3.22.4"
  }
}
```

### 7.2 Environment Variables (.env)
```env
# Server Configuration
PORT=3001
NODE_ENV=production

# SMTP Configuration (Office 365)
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password

# Email Settings
TEAM_EMAIL=contact@disrupt.inc
FROM_EMAIL=noreply@emex.com
FROM_NAME=Disrupt Inc.

# Allowed Origins (comma-separated)
ALLOWED_ORIGINS=https://disruptinc.io,https://www.disruptinc.io
```

### 7.3 API Endpoints

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | `/api/health`    | Health check             |
| POST   | `/api/send-email`| Contact form submission  |

---

## 8. PM2 Configuration

Create `ecosystem.config.cjs` in backend directory:

```javascript
module.exports = {
  apps: [{
    name: 'disrupt-api',
    script: 'server.js',
    cwd: '/var/www/disruptinc.io/backend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/var/www/disruptinc.io/logs/error.log',
    out_file: '/var/www/disruptinc.io/logs/app.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
```

PM2 Commands:
```bash
# Start the application
pm2 start ecosystem.config.cjs

# Save PM2 process list for auto-start on reboot
pm2 save

# View logs
pm2 logs disrupt-api

# Restart application
pm2 restart disrupt-api

# View status
pm2 status
```

---

## 9. GitHub Actions Deployment

### 9.1 Required GitHub Secrets

Configure these secrets in GitHub repository settings:

| Secret Name        | Description                          | Example Value                |
|--------------------|--------------------------------------|------------------------------|
| `SSH_PRIVATE_KEY`  | SSH private key for server access    | -----BEGIN OPENSSH PRIVATE KEY----- |
| `SERVER_HOST`      | Server IP or hostname                | 20.166.51.49                 |
| `SERVER_USER`      | SSH username                         | emexadmin                    |
| `SMTP_HOST`        | SMTP server hostname                 | smtp.office365.com           |
| `SMTP_PORT`        | SMTP port                            | 587                          |
| `SMTP_SECURE`      | Use TLS                              | false                        |
| `SMTP_USER`        | SMTP username                        | noreply@emex.com             |
| `SMTP_PASS`        | SMTP password                        | ********                     |
| `TEAM_EMAIL`       | Team notification email              | contact@disrupt.inc          |
| `FROM_EMAIL`       | From email address                   | noreply@emex.com             |
| `FROM_NAME`        | From display name                    | Disrupt Inc.                 |
| `VITE_GA4_MEASUREMENT_ID` | Google Analytics ID           | G-G0GBZFQJZ2                 |

### 9.2 Workflow Files Location
```
.github/workflows/
├── test.yml             # Run tests on every push (active)
├── deploy-nodejs.yml    # Full deployment (frontend + backend) - enable when ready
└── deploy.yml           # Legacy PHP deployment (disabled)
```

---

## 10. Deployment Workflow

### Automatic Deployment Trigger
- **Branch**: `main`
- **Event**: Push or merge to main
- **Process**:
  1. Build React frontend with Vite
  2. Run frontend tests
  3. Install Node.js backend dependencies
  4. Deploy frontend to `/var/www/disruptinc.io/frontend`
  5. Deploy backend to `/var/www/disruptinc.io/backend`
  6. Generate `.env` from GitHub secrets
  7. Restart PM2 process
  8. Verify deployment with health check

### Manual Deployment
- Go to GitHub → Actions → Select workflow → "Run workflow"

---

## 11. Health Check & Monitoring

### API Health Endpoint Response
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0",
  "uptime": 86400
}
```

### Monitoring Commands
```bash
# Check PM2 status
pm2 status

# Check Nginx status
sudo systemctl status nginx

# Check Node.js process
pm2 logs disrupt-api --lines 100

# Test health endpoint
curl https://disruptinc.io/api/health

# Test contact form
curl -X POST https://disruptinc.io/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","company":"Test","subject":"Test","message":"Test message"}'
```

---

## 12. Firewall Configuration

```bash
# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Verify rules
sudo ufw status
```

**Note**: Port 3001 (Node.js) should NOT be exposed externally. Nginx proxies all API traffic.

---

## 13. Backup Strategy

### Automated Backups (recommended)
```bash
# Create backup script
cat > /home/emexadmin/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/emexadmin/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/disruptinc_$DATE.tar.gz /var/www/disruptinc.io
# Keep only last 7 backups
ls -t $BACKUP_DIR/*.tar.gz | tail -n +8 | xargs -r rm
EOF

chmod +x /home/emexadmin/backup.sh

# Add to crontab (daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /home/emexadmin/backup.sh") | crontab -
```

---

## 14. Rollback Procedure

If deployment fails:
```bash
# SSH into server
ssh emexadmin@20.166.51.49

# Restore from backup
cd /var/www
tar -xzf /home/emexadmin/backups/disruptinc_YYYYMMDD_HHMMSS.tar.gz

# Restart services
pm2 restart disrupt-api
sudo systemctl reload nginx
```

---

## 15. TODO Checklist for DevOps

### Server Setup
- [ ] Provision Ubuntu 22.04/24.04 LTS server
- [ ] Configure firewall (UFW) - ports 22, 80, 443 only
- [ ] Install Node.js 22.x LTS
- [ ] Install PM2 globally
- [ ] Install Nginx
- [ ] Install Certbot

### Application Setup
- [ ] Create directory structure `/var/www/disruptinc.io/{frontend,backend,logs}`
- [ ] Set proper ownership: `chown -R www-data:www-data /var/www/disruptinc.io`
- [ ] Configure Nginx virtual host
- [ ] Obtain SSL certificate with Certbot
- [ ] Test Nginx configuration

### GitHub Setup
- [ ] Generate SSH key pair for deployment
- [ ] Add public key to server `~/.ssh/authorized_keys`
- [ ] Add private key as `SSH_PRIVATE_KEY` GitHub secret
- [ ] Configure all required GitHub secrets (see section 9.1)
- [ ] Create/update GitHub Actions workflow files

### Backend Migration (from PHP to Node.js) - COMPLETED
- [x] Create Node.js backend with Express
- [x] Implement `/api/health` endpoint
- [x] Implement `/api/send-email` endpoint with Nodemailer
- [x] Add input validation with Zod
- [x] Add rate limiting
- [x] Add security headers with Helmet
- [x] Add unit tests (23 tests passing)
- [ ] Test email sending with Office 365 SMTP (needs production env)

### Deployment Testing
- [ ] Run manual deployment test
- [ ] Verify frontend loads at https://disruptinc.io
- [ ] Verify `/api/health` returns OK
- [ ] Test contact form submission
- [ ] Verify PM2 auto-restart works
- [ ] Test SSL certificate renewal

### Monitoring Setup
- [ ] Configure PM2 monitoring
- [ ] Set up log rotation for application logs
- [ ] Configure automated backups
- [ ] Document rollback procedure

---

## 16. Backend Stack (Implemented)

| Component        | Technology              |
|------------------|-------------------------|
| Backend Runtime  | Node.js 22.x            |
| Web Server       | Nginx (reverse proxy)   |
| Framework        | Express.js 4.x          |
| Email Library    | Nodemailer              |
| Validation       | Zod                     |
| Security         | Helmet, CORS, Rate Limit|
| Process Manager  | PM2                     |
| Testing          | Node.js built-in test runner |

### Backend Structure (Already Implemented)
```
backend/
├── server.js              # Express entry point
├── routes/
│   ├── health.js          # GET /api/health
│   └── email.js           # POST /api/send-email
├── services/
│   └── emailService.js    # Nodemailer email logic
├── tests/
│   ├── validation.test.js # Input validation tests
│   ├── emailService.test.js # Email & XSS tests
│   └── health.test.js     # Health endpoint tests
├── package.json
├── .env.example
└── .gitignore
```

---

## Contact

For questions about this specification, contact the development team.

---

**Document Version**: 1.0
**Last Updated**: November 2024
**Project**: Disrupt Inc. Website (https://disruptinc.io)
