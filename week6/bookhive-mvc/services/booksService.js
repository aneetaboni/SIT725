const Book = require('../models/Book');

async function searchBooks({ q, author, category, page = 1, limit = 10 }) {
  const filter = {};
  if (q) filter.$or = [{ title: new RegExp(q, 'i') }, { author: new RegExp(q, 'i') }];
  if (author) filter.author = new RegExp(author, 'i');
  if (category) filter.category = new RegExp(category, 'i');

  page = Number(page) || 1;
  limit = Number(limit) || 10;
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Book.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Book.countDocuments(filter)
  ]);

  return { items, total, page, pages: Math.ceil(total / limit) };
}

async function getById(id) { return Book.findById(id); }
async function createBook(payload) { return Book.create(payload); }
async function updateBook(id, payload) {
  return Book.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
}
async function deleteBook(id) { return Book.findByIdAndDelete(id); }

module.exports = { searchBooks, getById, createBook, updateBook, deleteBook };
