# 🚀 Disrupt Website Deployment Guide

## 📍 Overview

The Disrupt Inc. website uses **automated deployment via GitHub Actions** for both frontend and backend components.

### 🏗️ Architecture

```
Disrupt Website
├── Frontend (React + TypeScript)
│   ├── Built with Vite
│   ├── Tailwind CSS + ShadCN UI
│   └── Multi-language support (i18n)
└── Backend (PHP)
    ├── health.php         # Health check endpoint
    ├── send-email.php     # Contact form API
    ├── email-service.php  # Email functionality
    ├── validation.php     # Input validation
    ├── email-templates.php # HTML email templates
    └── config.php         # Configuration
```

### 🌐 Production Environment

- **Website**: https://disruptinc.io
- **API Base**: https://disruptinc.io/api/
- **Server**: Azure Ubuntu VM
- **Web Server**: Apache 2.4+ with PHP 8.2+
- **SSL**: Let's Encrypt certificate

## 🚀 Automated Deployment (Recommended)

### 🌁 GitHub Actions Workflows

**Frontend Deployment** (`deploy.yml`):
- Triggers on push to `main` branch (excluding backend changes)
- Builds React app with Vite
- Runs frontend tests
- Deploys to `/var/www/html/`

**Backend Deployment** (`deploy-backend.yml`):
- Triggers on changes to `backend/**` files
- Validates PHP syntax
- Deploys PHP files to `/var/www/html/api/`
- Verifies API endpoints

### 🔄 Deployment Process

1. **Automatic**: Push changes to `main` branch
2. **Manual**: Use "Run workflow" in GitHub Actions
3. **Monitoring**: Check workflow status in GitHub Actions tab

## 🔧 Manual Deployment (Emergency)

For emergency deployments when GitHub Actions is unavailable:

### Frontend
```bash
# Build locally
npm run build

# Upload to server (requires SSH access)
scp -r dist/* user@server:/var/www/html/
```

### Backend
```bash
# Upload PHP files
scp backend/*.php user@server:/var/www/html/api/

# Set permissions on server
ssh user@server "cd /var/www/html/api && chmod 644 *.php && chown www-data:www-data *.php"
```

## 🧪 Post-Deployment Verification

### 🔍 Health Checks
```bash
# Website availability
curl -f https://disruptinc.io

# API health check
curl -f https://disruptinc.io/api/health

# Contact form test
curl -X POST https://disruptinc.io/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","company":"Test","subject":"Test","message":"Test"}'
```

## 🔐 Configuration

### 📧 SMTP Settings
Email configuration is managed through GitHub Secrets:
- `SMTP_HOST` - Email server hostname
- `SMTP_PORT` - Email server port (587)
- `SMTP_USER` - Email account username  
- `SMTP_PASS` - Email account password
- `SMTP_SECURE` - TLS encryption setting

### 🔒 Security Features

- ✅ **Input Validation**: All form data validated and sanitized
- ✅ **XSS Protection**: HTML content properly escaped
- ✅ **CORS Headers**: Configured for frontend domain
- ✅ **Environment Isolation**: Credentials in GitHub Secrets
- ✅ **File Permissions**: Proper Apache permissions (644)
- ✅ **Error Handling**: No sensitive data in error messages

## 📋 API Endpoints

### Health Check
```
GET /api/health
Response: {"status":"OK","timestamp":"...","version":"PHP Backend v1.0"}
```

### Contact Form
```
POST /api/send-email
Content-Type: application/json
Body: {"name":"...","email":"...","company":"...","subject":"...","message":"..."}
Response: {"success":true,"message":"Email sent successfully"}
```

## 🐛 Troubleshooting

### 📊 Monitoring
- **GitHub Actions**: Check workflow status for deployment issues
- **Website Status**: Monitor https://disruptinc.io uptime
- **API Health**: Regular checks of `/api/health` endpoint

### 🚪 Common Issues

**Deployment Fails:**
- Check GitHub Actions logs
- Verify SSH key in repository secrets
- Ensure server is accessible

**API Not Responding:**
- Check Apache service status
- Verify PHP files deployed correctly
- Test file permissions (644)

**Email Not Sending:**
- Verify SMTP credentials in GitHub Secrets
- Check Office 365 SMTP access
- Review server-side email logs

### 🔍 Debug Commands
```bash
# Check Apache status
sudo systemctl status apache2

# Check PHP syntax
php -l /var/www/html/api/*.php

# Check file permissions
ls -la /var/www/html/api/

# View Apache error logs
sudo tail -f /var/log/apache2/error.log
```

## ✅ Quick Start

1. **Make changes** to frontend or backend code
2. **Push to main branch** or create pull request
3. **GitHub Actions** handles deployment automatically
4. **Verify deployment** at https://disruptinc.io

🎉 **The website is live and automatically maintained!**