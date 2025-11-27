import express from 'express';

export const healthRouter = express.Router();

const startTime = Date.now();

healthRouter.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: Math.floor((Date.now() - startTime) / 1000)
  });
});
