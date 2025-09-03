const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  isbn: { type: String, trim: true },
  copies: { type: Number, default: 1, min: 1 },
  available: { type: Number, default: 1, min: 0 },
  tags: [{ type: String, trim: true }]
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
