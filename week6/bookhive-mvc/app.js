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

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

connectDB();

app.get('/', (_req, res) => res.send('Online Library API is running'));
app.get('/health', (_req, res) => res.json({ ok: true }));


console.log('booksRoute typeof:', typeof booksRoute);

app.use('/api/books', booksRoute);

app.use((req, res, _next) => {
  res.status(404).json({ error: `Route not found: ${req.originalUrl}` });
});

app.use(errorHandler);

module.exports = app;
