// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error('ERROR:', err && err.stack ? err.stack : err);
  if (res.headersSent) return next(err);
  if (err && (err.name === 'ValidationError' || err.name === 'CastError')) {
    return res.status(400).json({ error: err.message });
  }
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
};
