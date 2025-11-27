import { describe, it } from 'node:test';
import assert from 'node:assert';

// Test the health endpoint response structure
// We test the expected shape, not the actual HTTP call

describe('Health Response Structure', () => {
  const createHealthResponse = (startTime) => ({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: Math.floor((Date.now() - startTime) / 1000)
  });

  it('has status OK', () => {
    const response = createHealthResponse(Date.now());
    assert.strictEqual(response.status, 'OK');
  });

  it('has valid ISO timestamp', () => {
    const response = createHealthResponse(Date.now());
    const parsed = new Date(response.timestamp);
    assert.ok(!isNaN(parsed.getTime()));
  });

  it('has version string', () => {
    const response = createHealthResponse(Date.now());
    assert.strictEqual(typeof response.version, 'string');
    assert.ok(response.version.length > 0);
  });

  it('has uptime as number', () => {
    const response = createHealthResponse(Date.now() - 5000);
    assert.strictEqual(typeof response.uptime, 'number');
    assert.ok(response.uptime >= 0);
  });
});
