# PHP Backend Documentation

## Overview

The backend is a robust PHP API server that handles contact form submissions and email delivery using Apache web server.

## Tech Stack

- **PHP 8.3+** - Server-side scripting language
- **Apache** - Web server with mod_rewrite
- **PHPMailer** - Professional email sending library
- **PHPUnit** - Unit testing framework
- **Composer** - Dependency management
- **JSON** - Data exchange format
- **CORS** - Cross-origin resource sharing headers

## Architecture

### Project Structure
```
backend/
├── health.php              # Health check endpoint
├── send-email.php          # Contact form API endpoint
├── email-service.php       # Email sending functionality
├── email-templates.php     # HTML email templates
├── validation.php          # Input validation logic
├── config.php             # Configuration and constants
├── composer.json          # PHP dependency configuration
├── composer.lock          # Locked dependency versions
├── phpunit.xml            # PHPUnit test configuration
├── tests/                 # PHPUnit test suite
│   ├── bootstrap.php      # Test bootstrap file
│   ├── Unit/             # Unit tests
│   └── Critical/         # Critical functionality tests
└── vendor/               # Composer dependencies (auto-generated)
```

### API Endpoints

#### GET /api/health
Returns the health status of the PHP backend API.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-09-13T08:39:25+00:00",
  "version": "PHP Backend v1.0"
}
```

#### POST /api/send-email
Handles contact form submissions and sends emails via SMTP.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Example Corp", 
  "subject": "Business Inquiry",
  "message": "Hello, I'm interested in your automation solutions..."
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
  "message": "Validation error: Company is required"
}
```

## Configuration

The PHP backend uses server environment variables for configuration:

- `SMTP_HOST` - Email server hostname (smtp.office365.com)
- `SMTP_PORT` - Email server port (587)
- `SMTP_USER` - Email account username
- `SMTP_PASS` - Email account password  
- `SMTP_SECURE` - Use TLS encryption (false for STARTTLS)

## Features

### Email Functionality
- **Office 365 SMTP** integration for reliable email delivery
- **HTML email templates** with professional formatting
- **Automatic team notifications** sent to contact@disruptinc.io
- **Form validation** with comprehensive error handling
- **Cross-origin support** for frontend integration

### Security
- **Input sanitization** prevents XSS and injection attacks
- **Email validation** using PHP filter functions
- **CORS headers** restrict access to authorized domains
- **Error handling** doesn't expose sensitive information
- **File permissions** properly configured for Apache

### Performance
- **Native PHP** - No additional runtime dependencies
- **Apache integration** - Optimized for web server performance  
- **Minimal footprint** - Lightweight and fast response times
- **Production ready** - Tested and deployed architecture

## Testing

### PHPUnit Test Suite
The backend includes comprehensive PHPUnit tests covering all critical functionality:

```bash
# Install test dependencies
composer install

# Run all tests with detailed output
./vendor/bin/phpunit --testdox

# Run specific test suites
./vendor/bin/phpunit tests/Unit/         # Unit tests
./vendor/bin/phpunit tests/Critical/     # Critical functionality tests

# Run tests with coverage (requires Xdebug)
./vendor/bin/phpunit --coverage-html coverage/
```

### Test Categories

#### Critical Tests (`tests/Critical/`)
- **ConfigCriticalTest** - Configuration and environment setup
- **EmailServiceCriticalTest** - Email sending functionality
- **EmailTemplatesCriticalTest** - HTML email template generation
- **ValidationCriticalTest** - Input validation and security

#### Unit Tests (`tests/Unit/`)
- **SimpleTest** - Basic PHP functionality verification

### Continuous Integration
Tests run automatically in GitHub Actions during deployment:
- ✅ PHP syntax validation
- ✅ Composer dependency installation
- ✅ PHPUnit test execution
- ✅ Deployment only proceeds if tests pass

## Development

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

### Local Development Setup
```bash
# Navigate to backend directory
cd backend/

# Install Composer dependencies
composer install

# Run tests to verify setup
./vendor/bin/phpunit --testdox

# Validate PHP syntax
php -l *.php
```

### File Permissions
On the production server, ensure proper permissions:
```bash
chmod 644 /var/www/html/api/*.php
chown www-data:www-data /var/www/html/api/*.php
```

## Deployment

The PHP backend deploys automatically via GitHub Actions when files in `backend/**` are changed:

1. **Composer Installation** - Installs PHP dependencies from composer.json
2. **PHP Syntax Validation** - Ensures all files are valid PHP
3. **PHPUnit Testing** - Runs comprehensive test suite (deployment fails if tests fail)
4. **File Upload** - Copies PHP files to `/var/www/html/api/`
5. **Environment Setup** - Generates .env file from GitHub secrets
6. **PHPMailer Installation** - Installs email library on production server
7. **Permission Setup** - Sets proper Apache file permissions
8. **Health Verification** - Tests API endpoints post-deployment

### Environment Management
Production environment variables are automatically generated from GitHub secrets:
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - Email configuration
- `TEAM_EMAIL`, `FROM_EMAIL`, `FROM_NAME` - Email addressing
- `PORT` - Server port configuration

This ensures consistent configuration across deployments and keeps sensitive data secure.

## Monitoring

### Health Checks
- **Endpoint**: GET `/api/health`
- **Response Time**: < 100ms typical
- **Availability**: 99.9% uptime target

### Logging  
- **Apache Access Logs** - Request logging and metrics
- **Apache Error Logs** - PHP errors and warnings
- **Email Delivery** - SMTP transaction logging

### Troubleshooting
Common issues and solutions:

**API returning 404:**
- Check Apache mod_rewrite is enabled
- Verify .htaccess configuration
- Ensure PHP files have correct permissions

**Email not sending:**
- Verify SMTP credentials in environment variables
- Check Office 365 account SMTP access
- Review Apache error logs for PHP mail errors

**CORS errors:**
- Verify frontend domain in CORS configuration
- Check request headers and methods
- Ensure preflight OPTIONS requests handled

---

© 2025 Disrupt Inc. All rights reserved.