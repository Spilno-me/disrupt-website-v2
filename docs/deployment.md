# Deployment Guide

Complete guide for deploying the Disrupt website to production servers with both automated and manual deployment options.

## 🎯 Production Environment

### Server Configuration
- **Server IP**: `20.166.51.49`
- **Username**: `emexadmin`
- **Production URL**: `https://disruptinc.io`
- **Document Root**: `/var/www/html`
- **Web Server**: Apache 2.4+
- **PHP Version**: 8.1+

### Prerequisites
- SSH access to production server
- Apache with mod_rewrite enabled
- PHP with required extensions (curl, openssl, mbstring)
- Composer for PHP dependencies
- Valid SSL certificate

## 🚀 Automated Deployment

The fastest way to deploy is using our automated deployment scripts.

### 1. Build and Package
```bash
./deploy.sh
```

This script will:
- Build the React frontend with Vite
- Create a deployment package in `deploy-package/`
- Include all necessary files (HTML, CSS, JS, PHP, .htaccess)
- Copy environment configurations
- Display manual deployment instructions

### 2. Deploy to Server
```bash
./deploy-to-server.sh
```

This script will:
- Verify deployment package exists
- Create server backups automatically
- Upload files via SCP
- Set proper file permissions
- Install PHP dependencies (PHPMailer)
- Test Apache configuration
- Reload Apache server
- Run health checks
- Verify deployment success

### Expected Output
```
🚀 Starting deployment to production server...
📦 Deployment package verified
🔐 Connecting to server and deploying...
📤 Uploading files...
🔧 Setting up server...
🧪 Testing deployment...
✅ Health check passed
✅ Main page accessible
🎉 Deployment complete!

📋 Summary:
   🌐 Website: https://disruptinc.io
   📧 Contact API: https://disruptinc.io/api/send-email.php
   ❤️  Health Check: https://disruptinc.io/api/health.php
```

## 🔧 Manual Deployment

If automated deployment fails or you prefer manual control:

### 1. Build Frontend
```bash
npm run build
```

### 2. Create Deployment Package
```bash
rm -rf deploy-package
mkdir deploy-package

# Copy built frontend
cp -r dist/* deploy-package/

# Copy PHP backend
mkdir -p deploy-package/api
cp -r backend-php/* deploy-package/api/

# Copy configuration
cp .htaccess deploy-package/
```

### 3. Upload Files
Using SCP:
```bash
scp -r deploy-package/* emexadmin@20.166.51.49:/var/www/html/
```

Using SFTP:
```bash
sftp emexadmin@20.166.51.49
put -r deploy-package/* /var/www/html/
```

Using FTP client (FileZilla, WinSCP, etc.):
- Connect to server
- Navigate to `/var/www/html/`
- Upload all files from `deploy-package/`

### 4. Server Configuration
SSH to server and run:
```bash
ssh emexadmin@20.166.51.49
cd /var/www/html

# Set file permissions
sudo chmod 644 *.html *.svg .htaccess
sudo chmod 644 assets/*
sudo chmod 644 api/*.php
sudo chmod 600 api/.env
sudo chown -R www-data:www-data .

# Install PHP dependencies
cd api
composer require phpmailer/phpmailer --no-dev
cd ..

# Test and reload Apache
sudo apache2ctl configtest
sudo systemctl reload apache2
```

## 🔐 Environment Configuration

### PHP Backend Environment
Create and configure `/var/www/html/api/.env`:
```env
# SMTP Configuration
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@emex.com
SMTP_PASS=your-app-password

# Application Settings
TEAM_EMAIL=contact@disrupt.inc
FROM_EMAIL=noreply@emex.com
FROM_NAME=Disrupt Inc.

# Security
CORS_ORIGINS=https://disruptinc.io,https://www.disruptinc.io
```

### Apache Virtual Host
Example Apache configuration:
```apache
<VirtualHost *:80>
    ServerName disruptinc.io
    DocumentRoot /var/www/html
    
    # Redirect to HTTPS
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</VirtualHost>

<VirtualHost *:443>
    ServerName disruptinc.io
    DocumentRoot /var/www/html
    
    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/disruptinc.io.crt
    SSLCertificateKeyFile /etc/ssl/private/disruptinc.io.key
    
    # Security Headers
    Header always set Strict-Transport-Security "max-age=63072000"
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    
    # PHP Configuration
    <Directory "/var/www/html">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

## 📊 File Structure After Deployment

```
/var/www/html/
├── index.html                 # Main webpage
├── assets/                    # CSS, JS, images, fonts
│   ├── index-[hash].css      # Compiled Tailwind CSS
│   ├── index-[hash].js       # React application bundle
│   └── hero_bg_optimized.jpg # Optimized hero background
├── favicon_dark.svg          # Dark theme favicon
├── favicon_light.svg         # Light theme favicon
├── robots.txt                # Search engine directives
├── sitemap.xml              # Site structure for SEO
├── .htaccess                # Apache configuration
└── api/                     # PHP backend
    ├── .env                 # Environment variables (secure)
    ├── config.php           # Configuration loader
    ├── send-email.php       # Contact form endpoint
    ├── health.php           # Health check endpoint
    ├── email-service.php    # Email abstraction
    ├── email-templates.php  # HTML templates
    ├── validation.php       # Input validation
    └── vendor/              # Composer dependencies
        └── phpmailer/       # Email library
```

## 🧪 Post-Deployment Testing

### 1. Health Check
```bash
curl -X GET https://disruptinc.io/api/health.php
```
Expected response:
```json
{
  "status": "healthy",
  "smtp_configured": true,
  "php_version": "8.1.0"
}
```

### 2. Main Website
Visit `https://disruptinc.io` and verify:
- Page loads correctly
- All assets load (CSS, JS, images)
- Language switching works
- Contact form displays properly
- Mobile responsiveness

### 3. Contact Form
Test the contact form:
- Fill out all required fields
- Submit the form
- Verify success message appears
- Check if emails are received

### 4. SEO Elements
Verify SEO optimization:
```bash
curl -s https://disruptinc.io/robots.txt
curl -s https://disruptinc.io/sitemap.xml
```

Check meta tags in page source:
- Title: "Disrupt Inc. - AI-Powered Automation Solutions"
- Description, keywords, Open Graph tags present
- Social media preview working

## ⚠️ Troubleshooting

### Common Issues

#### 1. Permission Denied Errors
```bash
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 644 /var/www/html/
sudo chmod 600 /var/www/html/api/.env
```

#### 2. SMTP Authentication Failures
- Verify SMTP credentials in `api/.env`
- Check Office365 app password (not regular password)
- Ensure port 587 is open on server
- Test SMTP connection manually

#### 3. Apache Rewrite Issues
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

#### 4. PHP Extension Missing
```bash
# Install required extensions
sudo apt-get install php-curl php-openssl php-mbstring
sudo systemctl restart apache2
```

#### 5. SSL Certificate Issues
```bash
# Check SSL certificate validity
openssl x509 -in /etc/ssl/certs/disruptinc.io.crt -text -noout
```

### Log Monitoring
Monitor server logs for issues:
```bash
# Apache error logs
sudo tail -f /var/log/apache2/error.log

# PHP error logs (if enabled)
sudo tail -f /var/log/php_errors.log

# System logs
sudo journalctl -f -u apache2
```

## 🔄 Rollback Procedure

If deployment fails, rollback to previous version:

### Automated Rollback
The deployment script creates automatic backups:
```bash
ssh emexadmin@20.166.51.49
sudo ls /var/backups/website-*
sudo cp -r /var/backups/website-YYYYMMDD-HHMMSS/* /var/www/html/
sudo systemctl reload apache2
```

### Manual Rollback
1. Keep previous deployment package locally
2. Re-upload previous version files
3. Restore previous `.env` configuration
4. Clear any cached content
5. Test functionality

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All code committed to repository
- [ ] Environment variables configured
- [ ] SMTP credentials tested locally
- [ ] Build process completes without errors
- [ ] All tests passing

### During Deployment  
- [ ] Backup current production files
- [ ] Upload new files successfully
- [ ] Set correct file permissions
- [ ] Install/update PHP dependencies
- [ ] Test Apache configuration
- [ ] Reload web server

### Post-Deployment
- [ ] Health check returns healthy status
- [ ] Main website loads correctly
- [ ] Contact form functions properly
- [ ] Email sending works
- [ ] SSL certificate valid
- [ ] SEO elements present (robots.txt, sitemap.xml)
- [ ] Social media previews work
- [ ] Mobile responsiveness verified
- [ ] Performance acceptable (< 3s load time)

## 🚀 Continuous Deployment (Future)

### GitHub Actions Workflow
```yaml
name: Deploy to Production
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build frontend
        run: npm run build
        
      - name: Deploy to server
        run: |
          # Add SSH key
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          
          # Run deployment script
          ./deploy-to-server.sh
        env:
          SSH_HOST: ${{ secrets.SSH_HOST }}
          SSH_USER: ${{ secrets.SSH_USER }}
```

This enables automatic deployment when code is pushed to the main branch.

## 📈 Performance Monitoring

### Uptime Monitoring
Set up monitoring for:
- `https://disruptinc.io` (main website)
- `https://disruptinc.io/api/health.php` (API health)

### Performance Metrics
Monitor:
- Page load time (< 3 seconds target)
- Time to First Byte (TTFB < 500ms)
- Core Web Vitals scores
- Email delivery success rate
- Server resource usage

### Alerting
Configure alerts for:
- Website downtime (> 1 minute)
- API errors (> 5% error rate)
- Email delivery failures
- SSL certificate expiration
- High server load (> 80% CPU/Memory)