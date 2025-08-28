const { Schema, model } = require('mongoose');

const BookSchema = new Schema(
  {
    title: { type: String, required: true, index: true, trim: true },
    author: { type: String, required: true, index: true, trim: true },
    category: { type: String, index: true, trim: true },
    availableCopies: { type: Number, default: 1, min: 0 }
  },
  { timestamps: true }
);

module.exports = model('Book', BookSchema);
