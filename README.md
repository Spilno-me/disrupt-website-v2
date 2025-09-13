# Disrupt Website

A modern, multilingual React website for Disrupt Inc. featuring AI-powered automation solutions, internationalization support, contact forms, and responsive design.

## 🌟 Overview

Disrupt Inc. builds intelligent automation systems that integrate software, services, and advisory into one unified platform. Our AI agent-driven approach eliminates inefficiency, scales effortlessly, and reduces costs for businesses.

**Website Features:**
- 🌍 **Multi-language support**: English, Spanish, Italian, Arabic (RTL), French
- 🎨 **Modern Design**: Built with React, TypeScript, and Tailwind CSS
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🐘 **PHP Backend**: Robust server-side API with Apache integration
- 📧 **Contact System**: Professional contact form with email integration
- 📊 **Analytics**: Google Analytics 4 with business-focused tracking
- ⚡ **Performance**: Optimized builds with Vite
- 🔒 **SEO Ready**: Meta tags, sitemaps, and social media optimization

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** + **ShadCN UI** components
- **Vite** build system
- **Zustand** for state management
- **React Hook Form** + **Zod** validation

### Backend
- **PHP 8.2+** with PHPMailer email integration
- **Apache** web server with mod_rewrite
- **RESTful API** for contact form processing
- **Email integration** with Office 365 SMTP
- **PHPUnit testing** with comprehensive test coverage
- **Automated deployment** with environment management

### Analytics
- **Google Analytics 4** (GA4) integration
- **Business-focused tracking**: Lead generation and contact intent
- **Terminal API access** via Google Cloud CLI
- **Privacy-compliant**: Minimal data collection approach

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Setup
```bash
npm run dev        # Start frontend development server
```

### 3. Production Deployment
```bash
npm run build      # Build frontend for production
# PHP backend is deployed via GitHub Actions
```

### 4. Access the Site
- **Frontend Development**: http://localhost:5173
- **Production Frontend**: https://disruptinc.io
- **API Endpoints**: https://disruptinc.io/api/

## 📁 Project Structure

```
disrupt-website/
├── src/                      # React frontend source
│   ├── components/          # UI components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom hooks (including analytics)
│   ├── utils/              # Utilities (including analytics.ts)
│   ├── i18n/               # Internationalization
│   └── constants/          # App constants (including GA4 config)
├── backend/                # PHP backend
│   ├── send-email.php     # Contact form API
│   ├── health.php         # Health check endpoint
│   ├── email-service.php  # Email service logic
│   ├── validation.php     # Input validation
│   ├── config.php         # PHP configuration
│   ├── composer.json      # PHP dependencies
│   ├── phpunit.xml        # PHPUnit configuration
│   └── tests/             # Backend test suite
├── docs/                  # Documentation
├── dist/                  # Built frontend
└── deploy-package/        # Deployment artifacts
```

## 📚 Documentation

- **[Analytics Setup](docs/analytics.md)** - Google Analytics 4 configuration and tracking
- **[Deployment Guide](docs/deployment.md)** - Production deployment instructions
- **[Backend API](docs/backend-api.md)** - PHP backend architecture and endpoints
- **[Frontend Guide](docs/frontend.md)** - React frontend development guide
- **[Internationalization](docs/i18n.md)** - Multi-language implementation details
- **[Email Configuration](docs/email-setup.md)** - SMTP and email setup guide

## 🌐 Production URLs

- **Main Website**: https://disruptinc.io
- **Contact API**: https://disruptinc.io/api/send-email
- **Health Check**: https://disruptinc.io/api/health

## 🛠️ Development Commands

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
npm test             # Run frontend tests
```

### Backend
```bash
cd backend           # Navigate to backend directory
composer install    # Install PHP dependencies
./vendor/bin/phpunit # Run backend tests
php -l *.php         # Validate PHP syntax
```

## 🚀 Deployment

### Automated Deployment (GitHub Actions)
- **Frontend**: Deploys automatically on push to `main`
- **Backend**: Deploys automatically when `backend/**` files change with:
  - ✅ Composer dependency installation
  - ✅ PHP syntax validation
  - ✅ PHPUnit test execution
  - ✅ Environment file generation from GitHub secrets
  - ✅ PHPMailer automatic installation
  - ✅ Production server deployment via SSH
- **Manual**: Use workflow dispatch in GitHub Actions

### Manual Deployment
1. `npm run build` - Build the frontend
2. `./deploy.sh` - Create deployment package  
3. Upload `deploy-package/` contents to your web server
4. Configure Apache/Nginx to serve the files

## 🔧 Environment Configuration

### Backend Configuration
The PHP backend uses environment variables automatically generated from GitHub Secrets during deployment:

#### Required GitHub Secrets
- `SMTP_HOST` - Email server hostname (smtp.office365.com)
- `SMTP_PORT` - Email server port (587)
- `SMTP_USER` - Email account username
- `SMTP_PASS` - Email account password
- `SMTP_SECURE` - Use TLS encryption (false for STARTTLS)
- `TEAM_EMAIL` - Team notification email (contact@disrupt.inc)
- `FROM_EMAIL` - From email address (noreply@emex.com)
- `FROM_NAME` - From name display (Disrupt Inc.)
- `PORT` - Server port (80 for Apache)
- `SSH_PASSWORD` - Server SSH password for deployment

#### Production Environment
- **Server**: 20.166.51.49 (Ubuntu with Apache)
- **PHP Version**: 8.3.6
- **Email Service**: PHPMailer with Office 365 SMTP
- **SSL**: Let's Encrypt certificate
- **Contact Emails**: Sent to contact@disrupt.inc

### Analytics Configuration
Google Analytics 4 is configured with:

- **Property ID**: `504857426`
- **Measurement ID**: `G-G0GBZFQJZ2`
- **Website URL**: `https://www.disruptinc.io`
- **Tracking**: Lead generation, contact intent, and page performance

See [Analytics Setup](docs/analytics.md) for detailed configuration and API access.

## 🧪 Testing

### Backend Testing
The backend includes a comprehensive PHPUnit test suite:

- **Critical Tests**: Core functionality (validation, email service, templates)
- **Unit Tests**: Individual component testing
- **Automated CI**: Tests run automatically in GitHub Actions
- **Coverage**: Email validation, SMTP configuration, template rendering

Run backend tests locally:
```bash
cd backend
composer install
./vendor/bin/phpunit --testdox
```

### Frontend Testing
Frontend tests use Vitest and React Testing Library:

- **Component Tests**: UI component functionality
- **i18n Tests**: Multi-language support verification
- **Hook Tests**: Custom React hooks testing

Run frontend tests locally:
```bash
npm test
```

## 🔧 Recent Improvements

### Contact Form Fix (September 2025)
- ✅ **Fixed 500 Internal Server Error** - PHPMailer installation issue resolved
- ✅ **Environment Management** - Automated .env generation from GitHub secrets
- ✅ **Email Integration** - Working Office 365 SMTP with PHPMailer
- ✅ **Production Deployment** - Automated via GitHub Actions

### Mobile Responsiveness
- ✅ **Hero Title Scaling** - Responsive text sizes for longer translations
- ✅ **Multi-language Support** - Better accommodation for Spanish/Arabic text
- ✅ **Cross-device Testing** - Consistent experience on all screen sizes

### Testing Infrastructure
- ✅ **Backend Test Suite** - PHPUnit with comprehensive coverage
- ✅ **CI/CD Integration** - Automated testing in deployment pipeline
- ✅ **Code Quality** - PHP syntax validation and dependency management

## 🌍 Supported Languages

- 🇺🇸 **English** (default)
- 🇪🇸 **Spanish** (Español)
- 🇮🇹 **Italian** (Italiano)  
- 🇸🇦 **Arabic** (العربية) with RTL support
- 🇫🇷 **French** (Français)

## 📄 License

© 2025 Disrupt Inc. All rights reserved.