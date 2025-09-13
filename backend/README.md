# PHP Backend API

A robust PHP backend API for the Disrupt Inc. website, providing contact form processing and email functionality.

## 🏗️ Architecture

- **PHP 8.2+** with native functionality
- **Apache** web server with mod_rewrite
- **RESTful API** endpoints
- **Email integration** with Office 365 SMTP
- **Input validation** and sanitization
- **Error handling** and logging

## 📋 API Endpoints

### Health Check
```
GET /api/health
```
**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-09-13T08:39:25+00:00",
  "version": "PHP Backend v1.0"
}
```

### Contact Form
```
POST /api/send-email
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "company": "Example Corp",
  "subject": "Business Inquiry",
  "message": "Hello, I'm interested in your services..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "testMode": false
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Validation error: Email is required"
}
```

## 📁 File Structure

```
backend/
├── health.php              # Health check endpoint
├── send-email.php          # Contact form API endpoint
├── email-service.php       # Email sending functionality
├── email-templates.php     # HTML email templates
├── validation.php          # Input validation logic
├── config.php             # Configuration and constants
└── README.md              # This file
```

## 🔧 Configuration

The backend reads configuration from environment variables:

- `SMTP_HOST` - Email server hostname
- `SMTP_PORT` - Email server port  
- `SMTP_USER` - Email account username
- `SMTP_PASS` - Email account password
- `SMTP_SECURE` - Use TLS encryption

## 🚀 Deployment

### Via GitHub Actions (Recommended)
The backend deploys automatically when changes are made to `backend/**` files:

1. **PHP Syntax Validation** - Ensures all PHP files are valid
2. **File Upload** - Copies PHP files to `/var/www/html/api/`
3. **Permission Setup** - Sets proper Apache permissions
4. **Health Verification** - Tests API endpoints

### Manual Deployment
```bash
# Upload PHP files to server
scp backend/*.php user@server:/var/www/html/api/

# Set permissions on server
chmod 644 /var/www/html/api/*.php
chown www-data:www-data /var/www/html/api/*.php
```

## 🛠️ Development

### Local Testing
```bash
# Start PHP development server
php -S localhost:8000 -t backend/

# Test health endpoint
curl http://localhost:8000/health.php

# Test contact form
curl -X POST http://localhost:8000/send-email.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","company":"Test Co","subject":"Test","message":"Testing"}'
```

### Code Style
- **PHP 8.2+** syntax and features
- **PSR-12** coding standards
- **Error handling** with try/catch blocks
- **Input validation** for all user data
- **Prepared statements** for any database queries (if added)

## 📧 Email Features

- **Office 365 SMTP** integration
- **HTML email templates** with company branding
- **Automatic replies** to form submissions
- **Team notifications** sent to contact@disruptinc.io
- **Input sanitization** to prevent email injection
- **Rate limiting** to prevent spam

## 🔒 Security

- **Input validation** on all form fields
- **Email sanitization** to prevent injection
- **CORS headers** configured for frontend domain
- **Error messages** don't expose sensitive information
- **File permissions** restrict access to PHP source
- **Environment variables** keep credentials secure

## 🐛 Troubleshooting

### Common Issues

**Email not sending:**
- Check SMTP credentials in environment variables
- Verify Office 365 account has SMTP enabled
- Check server firewall allows port 587

**404 errors:**
- Ensure Apache mod_rewrite is enabled
- Check `.htaccess` configuration
- Verify PHP files have proper permissions

**Permission denied:**
- Set proper file ownership: `chown www-data:www-data *.php`
- Set proper permissions: `chmod 644 *.php`

## 📊 Monitoring

The API provides health checks and logging:
- **Health endpoint** at `/api/health`
- **Error logging** to Apache error logs
- **Email delivery** status tracking
- **API response times** via Apache access logs

---

© 2025 Disrupt Inc. All rights reserved.