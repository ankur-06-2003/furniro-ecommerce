import { httpRequestDuration, httpRequestTotal } from '../config/prometheus.js';

export const metricsMiddleware = (req, res, next) => {
  const start = Date.now();

  // Hook into res.end to capture status code
  const originalEnd = res.end;
  res.end = function (...args) {
    const duration = (Date.now() - start) / 1000;
    const route = req.route?.path || req.path;
    const statusCode = res.statusCode;

    // Record metrics
    httpRequestDuration.labels(req.method, route, statusCode).observe(duration);
    httpRequestTotal.labels(req.method, route, statusCode).inc();

    originalEnd.apply(res, args);
  };

  next();
};
