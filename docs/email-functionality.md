# Email Functionality Documentation

## Overview

The contact form implements a dual-email system that sends confirmation emails to users and notifications to the admin team when someone submits an inquiry.

## How It Works

### 1. Form Submission Flow
```
User fills form → Frontend validation → API call → Backend processing → Email sending → Response
```

### 2. Email Types

#### User Confirmation Email
**Purpose**: Confirms receipt of inquiry and sets expectations

**Template:**
```
Subject: Thank you for contacting Disrupt Software Inc.
From: "Disrupt Team" <your-email@domain.com>
To: [User's email address]

Content:
- Thanks for reaching out
- Confirmation of inquiry receipt
- Response time expectations
- Contact information
```

#### Admin Notification Email
**Purpose**: Notifies team of new inquiry requiring follow-up

**Template:**
```
Subject: New contact form submission
From: "Website Contact Form" <your-email@domain.com>
To: [Admin email - same as SMTP_USER]

Content:
- New inquiry notification
- User's contact details
- Form submission data
- Timestamp information
```

## Implementation Details

### Frontend Processing
Located in `src/App.tsx`:

```typescript
const onSubmit = async (data: FormData) => {
  try {
    const response = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    // Handle response and show notifications
    if (response.ok) {
      toast.success("Message sent successfully!");
      form.reset();
    }
  } catch (error) {
    toast.error("Failed to send message");
  }
}
```

### Backend Processing
Located in `backend/server.js`:

```javascript
app.post('/api/send-email', async (req, res) => {
  // 1. Validate input data
  // 2. Configure SMTP transport
  // 3. Send user confirmation email
  // 4. Send admin notification email  
  // 5. Return success/error response
});
```

### SMTP Configuration
Uses Nodemailer with configurable SMTP settings:

```javascript
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
```

## Error Handling

### Backend Fallbacks
- **SMTP Not Configured**: Logs warning, returns success (graceful degradation)
- **Email Send Failure**: Logs error, returns 500 status
- **Invalid Input**: Validates and sanitizes data

### Frontend Feedback
- **Success**: Green toast notification + form reset
- **Error**: Red toast with error message
- **Loading**: Button shows "Submitting..." state
- **Network Issues**: Generic error message displayed

## Email Content Structure

### User Confirmation Email
```html
<h2>Thank you for contacting Disrupt Software Inc.</h2>
<p>We've received your inquiry and will get back to you soon.</p>

<h3>Your Message:</h3>
<p><strong>Name:</strong> [User Name]</p>
<p><strong>Email:</strong> [User Email]</p>
<p><strong>Company:</strong> [Company Name]</p>
<p><strong>Message:</strong> [User Message]</p>

<p>We typically respond within 24-48 hours.</p>
<p>Best regards,<br>The Disrupt Team</p>
```

### Admin Notification Email  
```html
<h2>New Contact Form Submission</h2>
<p>A new inquiry has been submitted through the website.</p>

<h3>Contact Details:</h3>
<p><strong>Name:</strong> [User Name]</p>
<p><strong>Email:</strong> [User Email]</p>
<p><strong>Company:</strong> [Company Name]</p>
<p><strong>Message:</strong> [User Message]</p>

<p><strong>Submitted:</strong> [Timestamp]</p>
<p>Please follow up with the inquiry.</p>
```

## Security Considerations

### Input Validation
- Email format validation (Zod schema)
- Required field enforcement
- Message length limits
- XSS prevention through sanitization

### SMTP Security
- App-specific passwords (not account passwords)
- TLS encryption for email transmission
- Environment variable protection
- CORS restrictions on API access

## Monitoring & Debugging

### Server Logs
```javascript
console.log('Email sent successfully to:', email);
console.error('Email send error:', error);
```

### Health Check
Monitor email functionality via `/health` endpoint

### Common Issues
1. **SMTP authentication fails** - Check app password setup
2. **Emails in spam** - Configure SPF/DKIM records
3. **Rate limiting** - Gmail limits daily sends
4. **Network timeouts** - Check firewall/proxy settings