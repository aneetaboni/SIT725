// routes/books.js
const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.get('/ping', (_req, res) => res.json({ ok: true }));
router.get('/', booksController.list);
router.get('/:id', booksController.getOne);
router.post('/', booksController.create);
router.patch('/:id', booksController.update);
router.delete('/:id', booksController.remove);

module.exports = router; // 👈 IMPORTANT
