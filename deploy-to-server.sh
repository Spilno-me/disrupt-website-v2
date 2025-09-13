#!/bin/bash

# Deployment script for Disrupt Website
# Target Server: 20.166.51.49
# User: emexadmin
# Password: Password@Emex
# URL: https://disruptinc.io

set -e  # Exit on any error

SERVER="20.166.51.49"
USER="emexadmin"
REMOTE_PATH="/var/www/html"
LOCAL_PACKAGE="deploy-package"

echo "🚀 Starting deployment to production server..."
echo "Server: $SERVER"
echo "Target URL: https://disruptinc.io"
echo ""

# Check if deployment package exists
if [ ! -d "$LOCAL_PACKAGE" ]; then
    echo "❌ Deployment package not found!"
    echo "Please run: npm run build && ./deploy.sh first"
    exit 1
fi

echo "📦 Deployment package verified"
echo "Contents:"
ls -la $LOCAL_PACKAGE/

echo ""
echo "🔐 Connecting to server and deploying..."

# Create backup directory on server
echo "Creating backup..."
ssh $USER@$SERVER "sudo mkdir -p /var/backups/website-$(date +%Y%m%d-%H%M%S) && sudo cp -r $REMOTE_PATH/* /var/backups/website-$(date +%Y%m%d-%H%M%S)/ 2>/dev/null || true"

# Upload files
echo "📤 Uploading files..."
scp -r $LOCAL_PACKAGE/* $USER@$SERVER:$REMOTE_PATH/

# Set permissions and install dependencies
echo "🔧 Setting up server..."
ssh $USER@$SERVER << 'EOF'
    cd /var/www/html
    
    # Set proper permissions
    sudo chmod 644 *.html *.svg .htaccess
    sudo chmod 644 assets/*
    sudo chmod 644 api/*.php
    sudo chmod 600 api/.env
    sudo chown -R www-data:www-data .
    
    # Install PHPMailer if composer is available
    if command -v composer &> /dev/null; then
        cd api
        composer require phpmailer/phpmailer --no-interaction
        cd ..
    else
        echo "⚠️  Composer not found. PHPMailer should be installed manually."
    fi
    
    # Test Apache configuration
    sudo apache2ctl configtest
    
    # Reload Apache
    sudo systemctl reload apache2
    
    echo "✅ Server setup complete!"
EOF

echo ""
echo "🧪 Testing deployment..."

# Test health endpoint
if curl -f -s "https://disruptinc.io/api/health.php" > /dev/null; then
    echo "✅ Health check passed"
else
    echo "⚠️  Health check failed - please check server configuration"
fi

# Test main page
if curl -f -s "https://disruptinc.io" > /dev/null; then
    echo "✅ Main page accessible"
else
    echo "⚠️  Main page not accessible"
fi

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📋 Summary:"
echo "   🌐 Website: https://disruptinc.io"
echo "   📧 Contact API: https://disruptinc.io/api/send-email.php"
echo "   ❤️  Health Check: https://disruptinc.io/api/health.php"
echo ""
echo "📝 Next steps:"
echo "   1. Test the contact form functionality"
echo "   2. Verify email sending works"
echo "   3. Check SSL certificate status"
echo "   4. Monitor server logs: ssh $USER@$SERVER 'sudo tail -f /var/log/apache2/error.log'"
echo ""
echo "✅ Ready to go live!"