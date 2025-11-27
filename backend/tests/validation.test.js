import { describe, it } from 'node:test';
import assert from 'node:assert';
import { contactFormSchema } from '../routes/email.js';

describe('Contact Form Validation', () => {
  it('accepts valid input with all fields', () => {
    const input = {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Inc',
      message: 'Hello!'
    };

    const result = contactFormSchema.safeParse(input);
    assert.strictEqual(result.success, true);
  });

  it('accepts valid input with only required fields', () => {
    const input = {
      email: 'john@example.com',
      company: 'Acme Inc'
    };

    const result = contactFormSchema.safeParse(input);
    assert.strictEqual(result.success, true);
  });

  it('rejects missing email', () => {
    const input = {
      company: 'Acme Inc'
    };

    const result = contactFormSchema.safeParse(input);
    assert.strictEqual(result.success, false);
  });

  it('rejects invalid email format', () => {
    const input = {
      email: 'not-an-email',
      company: 'Acme Inc'
    };

    const result = contactFormSchema.safeParse(input);
    assert.strictEqual(result.success, false);
    assert.ok(result.error.errors[0].message.includes('email'));
  });

  it('rejects missing company', () => {
    const input = {
      email: 'john@example.com'
    };

    const result = contactFormSchema.safeParse(input);
    assert.strictEqual(result.success, false);
  });

  it('rejects empty company', () => {
    const input = {
      email: 'john@example.com',
      company: ''
    };

    const result = contactFormSchema.safeParse(input);
    assert.strictEqual(result.success, false);
  });
});
