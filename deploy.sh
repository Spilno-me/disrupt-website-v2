#!/bin/bash

# Deployment script for Disrupt Website
# Server: 20.166.51.49
# User: emexadmin
# URL: https://disruptinc.io

echo "🚀 Deploying Disrupt Website to production server..."

# Build frontend
echo "📦 Building frontend..."
npm run build

# Create deployment package
echo "📁 Creating deployment package..."
rm -rf deploy-package
mkdir -p deploy-package

# Copy built frontend
cp -r dist/* deploy-package/

# Copy PHP backend
mkdir -p deploy-package/api
cp -r backend-php/* deploy-package/api/

# Copy additional files
cp .htaccess deploy-package/ 2>/dev/null || echo "No .htaccess found"

echo "✅ Deployment package created in 'deploy-package' directory"
echo ""
echo "📋 Manual deployment steps:"
echo "1. SCP files to server:"
echo "   scp -r deploy-package/* emexadmin@20.166.51.49:/var/www/html/"
echo ""
echo "2. SSH to server and setup:"
echo "   ssh emexadmin@20.166.51.49"
echo "   cd /var/www/html"
echo "   chmod 644 api/*.php"
echo "   chown www-data:www-data api/ -R"
echo ""
echo "3. Install PHPMailer (if not available):"
echo "   composer require phpmailer/phpmailer"
echo ""
echo "🌐 Website will be available at: https://disruptinc.io"