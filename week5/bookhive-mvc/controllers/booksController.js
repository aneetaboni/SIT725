// controllers/booksController.js
const booksService = require('../services/booksService');

exports.list = async (req, res, next) => {
  try { const data = await booksService.searchBooks(req.query); return res.json({ data }); }
  catch (err) { return next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const item = await booksService.getById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Book not found' });
    return res.json({ data: item });
  } catch (err) { return next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { title, author, category, availableCopies } = req.body || {};
    if (!title || !author) return res.status(400).json({ error: 'title and author are required' });

    const payload = {
      title: String(title).trim(),
      author: String(author).trim(),
      category: category ? String(category).trim() : undefined,
      availableCopies:
        typeof availableCopies === 'number' ? availableCopies
        : availableCopies !== undefined ? Number(availableCopies)
        : undefined
    };

    const created = await booksService.createBook(payload);
    return res.status(201).json({ data: created });
  } catch (err) { return next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await booksService.updateBook(req.params.id, req.body || {});
    if (!updated) return res.status(404).json({ error: 'Book not found' });
    return res.json({ data: updated });
  } catch (err) { return next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await booksService.deleteBook(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Book not found' });
    return res.json({ data: { deleted: true } });
  } catch (err) { return next(err); }
};
