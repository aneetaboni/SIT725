const Book = require('../models/Book');

// GET /api/books
exports.list = async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim();
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || '10', 10), 1), 50);

    const filter = q
      ? { $or: [
          { title:  { $regex: q, $options: 'i' } },
          { author: { $regex: q, $options: 'i' } },
          { tags:   { $regex: q, $options: 'i' } }
        ] }
      : {};

    const [items, total] = await Promise.all([
      Book.find(filter).sort({ createdAt: -1 })
        .skip((page - 1) * limit).limit(limit).lean(),
      Book.countDocuments(filter)
    ]);

    res.json({ data: { items, total, page, pages: Math.ceil(total / limit) } });
  } catch (err) { next(err); }
};

// POST /api/books
exports.create = async (req, res, next) => {
  try {
    const { title, author, isbn, copies = 1, tags = '' } = req.body;
    const copiesNum = Number(copies) || 1;
    const doc = await Book.create({
      title, author, isbn,
      copies: copiesNum,
      available: copiesNum,
      tags: typeof tags === 'string'
        ? tags.split(',').map(t => t.trim()).filter(Boolean)
        : tags
    });
    res.status(201).json({ data: doc });
  } catch (err) { next(err); }
};
