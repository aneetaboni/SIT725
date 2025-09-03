// app.js
require('dotenv').config();

process.on('uncaughtException', (e) => { console.error('UNCAUGHT', e); });
process.on('unhandledRejection', (e) => { console.error('UNHANDLED', e); });

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');
const booksRoute = require('./routes/books');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// core middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// DB
connectDB();

// health
app.get('/health', (_req, res) => res.json({ ok: true }));

// DEBUG: prove what we're mounting
console.log('booksRoute typeof:', typeof booksRoute);

// ✅ mount ONLY books here (no other app.use yet)
app.use('/api/books', booksRoute);

// 404
app.use((req, res, _next) => {
  res.status(404).json({ error: `Route not found: ${req.originalUrl}` });
});

// errors last
app.use(errorHandler);

module.exports = app;
