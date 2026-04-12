const { logger } = require('../../logging/logger');

const requestLogger = (req, res, next) => {
  const start = Date.now();
  const url = req.originalUrl;

  logger.info(`STARTING ${req.method} ${url}`);
  res.on('finish', () => {
    const finish = Date.now();
    logger.info(`FINISHING ${req.method} ${url} with ${res.statusCode} after ${finish - start}ms`);
  });

  next();
};

module.exports = requestLogger;
