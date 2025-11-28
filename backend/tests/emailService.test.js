import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  escapeHtml,
  createUserConfirmationEmail,
  createNotificationEmail
} from '../services/emailService.js';

describe('HTML Escaping', () => {
  it('escapes < and > characters', () => {
    const result = escapeHtml('<script>alert("xss")</script>');
    assert.ok(!result.includes('<'));
    assert.ok(!result.includes('>'));
    assert.ok(result.includes('&lt;'));
    assert.ok(result.includes('&gt;'));
  });

  it('escapes quotes', () => {
    const result = escapeHtml('Hello "world" & \'friends\'');
    assert.ok(!result.includes('"'));
    assert.ok(!result.includes("'"));
    assert.ok(result.includes('&quot;'));
    assert.ok(result.includes('&#039;'));
  });

  it('escapes ampersand', () => {
    const result = escapeHtml('Tom & Jerry');
    assert.ok(result.includes('&amp;'));
  });

  it('returns empty string for null/undefined', () => {
    assert.strictEqual(escapeHtml(null), '');
    assert.strictEqual(escapeHtml(undefined), '');
    assert.strictEqual(escapeHtml(''), '');
  });
});

describe('User Confirmation Email', () => {
  it('has correct subject', () => {
    const email = createUserConfirmationEmail('John', 'Acme');
    assert.strictEqual(email.subject, 'Thank you for contacting Disrupt Software Inc.');
  });

  it('includes escaped name in HTML', () => {
    const email = createUserConfirmationEmail('<script>John</script>', 'Acme');
    assert.ok(!email.html.includes('<script>John</script>'));
    assert.ok(email.html.includes('&lt;script&gt;'));
  });

  it('uses "there" when name is empty', () => {
    const email = createUserConfirmationEmail('', 'Acme');
    assert.ok(email.html.includes('Hi there'));
  });

  it('includes company name', () => {
    const email = createUserConfirmationEmail('John', 'Acme Inc');
    assert.ok(email.html.includes('Acme Inc'));
  });
});

describe('Team Notification Email', () => {
  it('includes company in subject', () => {
    const email = createNotificationEmail('John', 'john@test.com', 'Acme', 'Hello');
    assert.ok(email.subject.includes('Acme'));
  });

  it('includes all fields in HTML', () => {
    const email = createNotificationEmail('John Doe', 'john@test.com', 'Acme Inc', 'Test message');
    assert.ok(email.html.includes('John Doe'));
    assert.ok(email.html.includes('john@test.com'));
    assert.ok(email.html.includes('Acme Inc'));
    assert.ok(email.html.includes('Test message'));
  });

  it('escapes XSS in all fields', () => {
    const email = createNotificationEmail(
      '<script>name</script>',
      '<script>email</script>',
      '<script>company</script>',
      '<script>message</script>'
    );
    assert.ok(!email.html.includes('<script>'));
  });

  it('handles missing name gracefully', () => {
    const email = createNotificationEmail('', 'john@test.com', 'Acme', 'Hello');
    assert.ok(email.html.includes('Not provided'));
  });

  it('handles missing message gracefully', () => {
    const email = createNotificationEmail('John', 'john@test.com', 'Acme', '');
    assert.ok(email.html.includes('No message provided'));
  });
});
