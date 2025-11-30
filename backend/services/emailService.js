import nodemailer from 'nodemailer';

export const escapeHtml = (str) => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const isSmtpConfigured = () => {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );
};

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

const getBaseStyles = () => `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
`;

const getUserConfirmationStyles = () => `
  ${getBaseStyles()}
  .header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px;
    text-align: center;
    border-radius: 10px 10px 0 0;
  }
  .content {
    background: #f8f9fa;
    padding: 30px;
    border-radius: 0 0 10px 10px;
  }
  .footer {
    text-align: center;
    margin-top: 20px;
    color: #666;
    font-size: 14px;
  }
`;

const getNotificationStyles = () => `
  ${getBaseStyles()}
  .header {
    background: #2D3142;
    color: white;
    padding: 20px;
    border-radius: 10px 10px 0 0;
  }
  .content {
    background: #f8f9fa;
    padding: 30px;
    border-radius: 0 0 10px 10px;
  }
  .field {
    margin-bottom: 15px;
  }
  .label {
    font-weight: bold;
    color: #2D3142;
  }
  .message-box {
    background: white;
    padding: 15px;
    border-radius: 5px;
    margin-top: 10px;
  }
`;

export const createUserConfirmationEmail = (name, company) => {
  const safeName = escapeHtml(name) || 'there';
  const safeCompany = escapeHtml(company);

  const html = `
    <html>
      <head><style>${getUserConfirmationStyles()}</style></head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank you for reaching out!</h1>
          </div>
          <div class="content">
            <p>Hi ${safeName},</p>
            <p>Thank you for your interest in Disrupt Inc. We've received your message and will get back to you within 24 hours.</p>
            <p>Our team is excited to learn more about ${safeCompany} and explore how we can help you achieve more with intelligent automation.</p>
            <p>Best regards,<br>The Disrupt Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 Disrupt Inc. | <a href="https://disruptinc.io">disruptinc.io</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  return {
    subject: 'Thank you for contacting Disrupt Software Inc.',
    html
  };
};

export const createNotificationEmail = (name, email, company, message) => {
  const safeName = escapeHtml(name) || 'Not provided';
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company);
  const safeMessage = escapeHtml(message) || 'No message provided';

  const html = `
    <html>
      <head><style>${getNotificationStyles()}</style></head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Disrupt Website - Form Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Name:</span> ${safeName}
            </div>
            <div class="field">
              <span class="label">Email:</span> ${safeEmail}
            </div>
            <div class="field">
              <span class="label">Company:</span> ${safeCompany}
            </div>
            <div class="field">
              <span class="label">Message:</span>
              <div class="message-box">${safeMessage}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  return {
    subject: `New contact form submission from ${safeCompany}`,
    html
  };
};

export const sendEmails = async (contactData) => {
  const { name, email, company, message } = contactData;

  console.log('=== EMAIL SENDING START ===');
  console.log('Contact data:', { name, email, company, messageLength: message?.length });
  console.log('SMTP configured:', isSmtpConfigured());
  console.log('TEAM_EMAIL:', process.env.TEAM_EMAIL);

  if (!isSmtpConfigured()) {
    console.log('TEST MODE - Email simulation:');
    console.log('User Confirmation Email to:', email);
    console.log('Team Notification Email to:', process.env.TEAM_EMAIL);
    return {
      success: true,
      message: 'Email sent successfully (TEST MODE)',
      testMode: true
    };
  }

  const transporter = createTransporter();

  const userEmail = createUserConfirmationEmail(name, company);
  const teamEmail = createNotificationEmail(name, email, company, message);

  // Send user confirmation
  console.log('Sending user confirmation to:', email);
  const userResult = await transporter.sendMail({
    from: `"${process.env.FROM_NAME || 'Disrupt Inc.'}" <${process.env.SMTP_USER}>`,
    to: email,
    subject: userEmail.subject,
    html: userEmail.html
  });
  console.log('User confirmation result:', userResult.response);

  // Send team notification
  console.log('Sending team notification to:', process.env.TEAM_EMAIL);
  const teamResult = await transporter.sendMail({
    from: `"${process.env.FROM_NAME || 'Disrupt Inc.'}" <${process.env.SMTP_USER}>`,
    to: process.env.TEAM_EMAIL,
    replyTo: email,
    subject: teamEmail.subject,
    html: teamEmail.html
  });
  console.log('Team notification result:', teamResult.response);
  console.log('=== EMAIL SENDING COMPLETE ===');

  return {
    success: true,
    message: 'Email sent successfully'
  };
};
