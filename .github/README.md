# 🚀 GitHub Actions CI/CD Pipeline

This repository uses a comprehensive GitHub Actions pipeline inspired by the EMEX X Application project structure. The workflows are organized into separate, focused files for different purposes.

## 📁 Workflow Organization

### 🚀 `deploy.yml` - Production Deployment
**Trigger:** Push to `main` branch or manual dispatch
**Purpose:** Build, test, and deploy the website to production server

**Features:**
- 🏗️ **Prepare**: Generate deployment version with timestamp and commit hash
- 🧪 **Build & Test**: Install dependencies, run tests, build production version
- 🚀 **Deploy**: SSH deployment to production server with backup
- ✅ **Verify**: Health check and deployment summary

**Jobs Flow:**
```
Prepare → Build & Test → Deploy → Verify
```

### 🔍 `pr-build-test.yml` - Pull Request Validation
**Trigger:** Pull requests or manual dispatch
**Purpose:** Validate code quality before merging

**Features:**
- 🏗️ **Build & Test**: Compile and test the application
- 🎨 **Lint & Format**: Code quality and TypeScript checks
- 📊 **Summary**: Comprehensive PR validation report

## ⚙️ Configuration

### Environment Variables
```yaml
NODE_VERSION: "18"           # Node.js version
SERVER_HOST: "20.166.51.49"  # Production server IP
SERVER_USER: "emexadmin"      # SSH username
DEPLOYMENT_PATH: "/var/www/html"  # Server deployment path
```

### Required Secrets
- `SSH_PRIVATE_KEY`: Private SSH key for server access (already configured ✅)

## 🎯 Deployment Features

### Automatic Backups
- Creates backup before each deployment
- Maintains backup rotation (current → backup → backup_old)
- Allows quick rollback if needed

### Smart Testing
- **Option to skip tests**: Manual dispatch with `skip_tests` parameter
- **Frontend-only testing**: No backend PHP tests (as requested)
- **Conditional execution**: Tests only run when needed

### Production Safety
- **Environment protection**: Uses GitHub environment settings
- **Health checks**: Verifies website accessibility after deployment
- **Rollback capability**: Automatic backup for quick recovery
- **Permission management**: Sets proper file permissions on server

## 🔧 Manual Deployment

### Skip Tests (Quick Deploy)
```bash
gh workflow run deploy.yml -f skip_tests=true
```

### Normal Deployment
```bash
gh workflow run deploy.yml
```

### Check Deployment Status
```bash
gh run list --limit 5
```

## 📊 Monitoring

### Deployment Tracking
- **Version format**: `YYYYMMDD_HHMMSS_[commit-hash]`
- **Full audit trail**: Every deployment is tracked and versioned
- **Deployment summary**: Clear success/failure reporting

### Health Monitoring
- **Website accessibility**: HTTPS health check
- **Server connectivity**: SSH connection validation
- **File permissions**: Automatic PHP file permission setup

## 🎨 Code Quality (PR Pipeline)

### Automated Checks
- ✅ **TypeScript compilation**: Ensures type safety
- ✅ **Build validation**: Confirms production build success
- ✅ **Test execution**: Runs all frontend tests
- ✅ **Output validation**: Verifies build artifacts

### PR Requirements
All PRs must pass:
1. 🏗️ Build & compilation
2. 🧪 Test suite execution
3. 🎨 Code quality checks
4. 📋 Build output validation

## 🚨 Troubleshooting

### Common Issues

**SSH Connection Failed**
- Verify SSH key is properly configured
- Check server accessibility: `ssh emexadmin@20.166.51.49`

**Build Failures**
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Review build logs in Actions tab

**Test Failures**
- Use `skip_tests=true` for urgent deployments
- Fix tests before next regular deployment
- Check test logs for specific failures

**Health Check Failed**
- Verify server is running
- Check website URL: https://disruptinc.io
- Review server logs for errors

## 📈 Best Practices

### Deployment Strategy
1. **Test locally** before pushing to main
2. **Use PR pipeline** for code review
3. **Monitor deployments** via Actions tab
4. **Keep backups** for quick rollback

### Development Workflow
```
Feature Branch → PR → Tests Pass → Merge → Auto Deploy
```

### Emergency Procedures
1. **Quick hotfix**: Use `skip_tests=true`
2. **Rollback**: SSH to server and restore from backup
3. **Health issues**: Check Actions logs and server status

---

🌐 **Production Website**: https://disruptinc.io  
📊 **Actions Dashboard**: [GitHub Actions Tab](../../actions)  
🔧 **SSH Access**: `ssh emexadmin@20.166.51.49`