require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../models/Book');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookhive';

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    await Book.deleteMany({});
    await Book.insertMany([
      { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', copies: 3, available: 3, tags: ['software', 'best-practices'] },
      { title: 'Design Patterns', author: 'Gamma et al.', isbn: '9780201633610', copies: 2, available: 2, tags: ['architecture', 'patterns'] },
      { title: 'Introduction to Algorithms', author: 'CLRS', isbn: '9780262033848', copies: 4, available: 4, tags: ['algorithms'] }
    ]);
    console.log('Seeded!');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
