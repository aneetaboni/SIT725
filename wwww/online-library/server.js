require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookhive';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI).then(() => console.log('Mongo connected'))
  .catch(e => { console.error('Mongo error:', e.message); process.exit(1); });

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());              // <-- needed for POST body parsing
app.use(express.urlencoded({ extended: true }));

app.use('/api/books', require('./routes/bookRoutes'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error', detail: err.message });
});

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
