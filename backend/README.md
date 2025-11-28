# Disrupt Website - Node.js Backend

Express.js API backend for the Disrupt Inc. website.

## Stack

- **Express.js** - Web framework
- **Nodemailer** - Email sending
- **Zod** - Validation
- **Helmet** - Security headers
- **CORS** - Cross-origin support
- **Rate Limiting** - Request throttling

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev

# Start production server
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/send-email` | Contact form submission |

### Health Check

```bash
curl http://localhost:3001/api/health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0",
  "uptime": 3600
}
```

### Send Email

```bash
curl -X POST http://localhost:3001/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Inc",
    "message": "Hello!"
  }'
```

Response:
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 3001) | No |
| `NODE_ENV` | Environment (development/production) | No |
| `SMTP_HOST` | SMTP server hostname | Yes |
| `SMTP_PORT` | SMTP port (default: 587) | No |
| `SMTP_SECURE` | Use SSL (true/false) | No |
| `SMTP_USER` | SMTP username | Yes |
| `SMTP_PASS` | SMTP password | Yes |
| `TEAM_EMAIL` | Team notification email | Yes |
| `FROM_NAME` | Sender display name | No |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins | No |

## Project Structure

```
backend/
├── server.js           # Entry point
├── routes/
│   ├── health.js       # Health check endpoint
│   └── email.js        # Email endpoint
├── services/
│   └── emailService.js # Email sending logic
├── package.json
├── .env.example
└── .gitignore
```

## Test Mode

If SMTP credentials are not configured, the backend runs in **test mode** and logs email details to console without sending actual emails.
