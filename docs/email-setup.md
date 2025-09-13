# Email Setup Instructions

## Overview

This guide walks you through setting up email functionality for the contact form using Microsoft Exchange SMTP.

## Prerequisites

- Microsoft Exchange email account (Office 365 or on-premises)
- Access to Exchange admin center or IT administrator
- Basic understanding of environment variables

## Step-by-Step Setup

### 1. Enable SMTP Authentication

**Why needed**: Exchange requires authenticated SMTP for sending emails.

#### For Office 365 (Exchange Online):
1. Go to [Microsoft 365 Admin Center](https://admin.microsoft.com/)
2. Navigate to **Users** > **Active users**
3. Select the email account you'll use
4. Go to **Mail** tab
5. Click **Manage email apps**
6. Enable **Authenticated SMTP**

#### For On-Premises Exchange:
Contact your IT administrator to:
- Enable SMTP authentication on the Exchange server
- Configure SMTP relay permissions
- Provide SMTP server details and port information

### 2. Configure App Password (if using MFA)

**Why needed**: If multi-factor authentication is enabled, you need an app-specific password.

1. Go to [Microsoft Account Security](https://account.microsoft.com/security)
2. Sign in with your Exchange/Office 365 account
3. Navigate to **Advanced security options**
4. Under **App passwords**, click **Create a new app password**
5. Enter "Disrupt Website" as the app name
6. Copy the generated password (save it securely)

### 3. Configure Environment Variables

Create `.env` file in the project root:

```bash
# Copy from .env.example
cp .env.example .env
```

Edit `.env` with your Exchange credentials:

#### For Office 365 (Exchange Online):
```bash
# Backend Server Configuration
PORT=3001

# Exchange Online SMTP Configuration
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password-or-app-password

# Frontend API Configuration (optional)
# VITE_API_URL=http://localhost:3001
```

#### For On-Premises Exchange:
```bash
# Backend Server Configuration
PORT=3001

# Exchange On-Premises SMTP Configuration
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password

# Frontend API Configuration (optional)
# VITE_API_URL=http://localhost:3001
```

**Important**: 
- Use your full Exchange email address for `SMTP_USER`
- Use your account password or app-specific password for `SMTP_PASS`
- Contact IT for on-premises server details (host and port may vary)
- Never commit the `.env` file to version control

### 4. Test Email Configuration

Start both servers and test the contact form:

```bash
# Terminal 1: Start frontend
npm run dev

# Terminal 2: Start backend
cd backend && npm start
```

1. Open http://localhost:5173
2. Fill out the contact form
3. Submit and check for success notification
4. Verify emails in both your Gmail sent folder and inbox

## Alternative Email Providers

### Gmail SMTP

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
```

*Note: Requires 2FA and app-specific password setup*

### Custom SMTP Server

```bash
SMTP_HOST=mail.your-domain.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@your-domain.com
SMTP_PASS=your-password
```

## Production Setup

### 1. Domain Email Setup

For production, use a domain-based email:

```bash
SMTP_USER=contact@disruptinc.io
SMTP_PASS=secure-password
```

### 2. Email Authentication Records

Add these DNS records to prevent spam filtering:

**SPF Record:**
```
TXT: "v=spf1 include:_spf.google.com ~all"
```

**DKIM Setup:**
1. Enable DKIM in Gmail Admin Console
2. Add provided DKIM record to DNS

**DMARC Record:**
```
TXT: "v=DMARC1; p=quarantine; rua=mailto:admin@disruptinc.io"
```

### 3. Security Considerations

- Use environment variables in production
- Rotate SMTP passwords regularly  
- Monitor for suspicious email activity
- Set up rate limiting to prevent abuse
- Consider using email service providers (SendGrid, Mailgun) for scale

## Troubleshooting

### Common Issues

**"Invalid login" or "Authentication failed" error:**
- Verify SMTP authentication is enabled in Exchange
- Double-check username and password
- Ensure full email address is used for SMTP_USER
- For MFA accounts, use app-specific password

**Emails going to spam:**
- Set up SPF/DKIM records for your domain
- Use professional email address (not personal)
- Configure proper reverse DNS
- Contact recipients to whitelist your domain

**Connection timeout or "Could not connect" error:**
- Check firewall settings (both client and server)
- Verify SMTP_HOST and SMTP_PORT with IT administrator
- Try SMTP_SECURE=true with port 465 for SSL
- For on-premises: ensure VPN connection if required

**Rate limiting or "Quota exceeded" error:**
- Exchange Online limits: 30 messages/minute, 10,000/day
- On-premises limits vary by configuration
- Implement backend rate limiting to prevent abuse
- Contact IT for higher send limits if needed

**"Relay access denied" error:**
- SMTP relay permissions not configured
- Contact Exchange administrator
- Ensure sending account has necessary permissions
- Check if IP/domain whitelisting is required

### Testing Commands

Test SMTP connection:

```bash
# Install nodemailer CLI tool
npm install -g nodemailer

# Test connection (in backend directory)
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  host: 'smtp-mail.outlook.com', // or your Exchange server
  port: 587,
  auth: { user: 'your-email@domain.com', pass: 'your-password' }
});
transporter.verify().then(console.log).catch(console.error);
"
```

### Environment Validation

Add this to your backend to validate configuration:

```javascript
// Add to server.js
const requiredEnvVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
const missing = requiredEnvVars.filter(key => !process.env[key]);
if (missing.length) {
  console.warn('Missing environment variables:', missing);
}
```

## Support

If you encounter issues:

1. Check the browser developer console for errors
2. Review backend server logs
3. Verify environment variables are loaded
4. Test with curl/Postman to isolate frontend vs backend issues
5. Check Gmail account activity for blocked login attempts