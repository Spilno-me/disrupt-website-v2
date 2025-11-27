# Disrupt Website - Claude Code Guidelines

## Project Overview

| Item | Value |
|------|-------|
| **Project** | Disrupt Inc. Corporate Website |
| **Repository** | https://github.com/Spilno-me/disrupt-website-v2 |
| **Production URL** | https://disruptinc.io |
| **Stack** | React + TypeScript + Vite (frontend), Node.js + Express (backend) |

---

## Git Workflow Rules

**IMPORTANT: Always follow these git rules when working on this project.**

### Branch Structure

```
main (production) ◄─── PR ─── develop (integration) ◄─── PR ─── feature/*
```

| Branch | Purpose | Auto-deploys |
|--------|---------|--------------|
| `main` | Production code | Yes (to disruptinc.io) |
| `develop` | Integration/staging | No |
| `feature/*` | New features | No |
| `fix/*` | Bug fixes | No |

### Rules

1. **NEVER commit directly to `main`** - Always use Pull Requests
2. **NEVER commit directly to `develop`** - Always use feature branches
3. **Create feature branches from `develop`**, not from `main`
4. **All new work starts with**: `git checkout develop && git pull && git checkout -b feature/xyz`

### Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/description` | `feature/homepage`, `feature/contact-form` |
| Bug fix | `fix/description` | `fix/mobile-nav` |
| Refactor | `refactor/description` | `refactor/api-structure` |

### Commit Messages

Use conventional commits:
```
feat: add contact form validation
fix: resolve mobile navigation bug
refactor: restructure email service
docs: update README
chore: update dependencies
```

### Creating a New Feature

```bash
# 1. Start from develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes and commit
git add .
git commit -m "feat: description of changes"

# 4. Push and create PR to develop
git push -u origin feature/your-feature-name
# Then create PR: feature/your-feature-name → develop
```

### Version Tags

| Tag | Description |
|-----|-------------|
| `v1-launching-soon` | Archived "Launching Soon" website |
| `v2.x.x` | New website versions |

When releasing to production:
```bash
git checkout main
git pull origin main
git tag -a v2.0.0 -m "Release description"
git push origin v2.0.0
```

---

## Project Structure

```
disrupt-website/
├── src/                    # React frontend source
│   ├── components/         # UI components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── i18n/               # Internationalization
│   └── services/           # API services
├── backend/                # Node.js API (Express)
│   ├── server.js           # Entry point
│   ├── routes/             # API routes
│   └── services/           # Business logic
├── dist/                   # Built frontend (generated)
└── .github/workflows/      # CI/CD pipelines
```

---

## Development Commands

```bash
# Frontend
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:5173)
npm run build        # Build for production
npm test             # Run tests

# Backend
cd backend
npm install          # Install dependencies
npm start            # Start server (localhost:3001)
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/send-email` | Contact form submission |

---

## Environment Variables

### Frontend (.env)
```
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Backend (backend/.env)
```
PORT=3001
NODE_ENV=production
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
TEAM_EMAIL=contact@disrupt.inc
FROM_EMAIL=noreply@domain.com
FROM_NAME=Disrupt Inc.
```

---

## Deployment

- **Automatic**: Push/merge to `main` triggers GitHub Actions deployment
- **Manual**: Go to GitHub Actions → Run workflow

---

## Important Notes

1. **Multi-language support**: Website supports EN, ES, IT, AR (RTL), FR
2. **No PHP**: Backend is Node.js only (migrated from PHP)
3. **Check GIT-WORKFLOW.md** for detailed git procedures
4. **Check DEVOPS-SPECIFICATION.md** for server setup details
