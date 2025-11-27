import express from 'express';
import { z } from 'zod';
import { sendEmails } from '../services/emailService.js';

export const emailRouter = express.Router();

export const contactFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Please provide a valid email address'),
  company: z.string().min(1, 'Company is required'),
  subject: z.string().optional(),
  message: z.string().optional()
});

emailRouter.post('/send-email', async (req, res) => {
  try {
    const validatedData = contactFormSchema.parse(req.body);

    const result = await sendEmails(validatedData);

    res.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.errors.map(e => e.message).join(', ');
      return res.status(400).json({
        success: false,
        message
      });
    }

    console.error('Email sending error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.'
    });
  }
});
