// test/books.test.js
const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');

// Use a dedicated DB for tests
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/online_library_test';

const app = require('../app');
const Book = require('../models/Book');

describe('Books API', function () {
  this.timeout(15000);

  before(async () => {
    // Ensure we are connected (app connects on import)
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB not connected for tests');
    }
  });

  beforeEach(async () => {
    await Book.deleteMany({});
  });

  after(async () => {
    // Clean up test DB and close connection
    await mongoose.connection.dropDatabase().catch(() => {});
    await mongoose.connection.close().catch(() => {});
  });

  it('GET /health -> 200 ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('ok', true);
  });

  it('GET /api/books -> returns empty list structure', async () => {
    const res = await request(app).get('/api/books');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.include.keys(['items', 'total', 'page', 'pages']);
    expect(res.body.data.items).to.be.an('array').that.has.length(0);
    expect(res.body.data.total).to.equal(0);
  });

  it('POST /api/books -> 400 when title/author missing', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({ category: 'SE' });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('POST /api/books -> 201 and returns created book', async () => {
    const payload = { title: 'Clean Code', author: 'Robert C. Martin', category: 'SE', availableCopies: 3 };
    const res = await request(app).post('/api/books').send(payload);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.include({ title: 'Clean Code', author: 'Robert C. Martin', category: 'SE' });
    expect(res.body.data).to.have.property('_id');
  });

  it('GET /api/books after create -> list has 1 item', async () => {
    await Book.create({ title: 'TDD by Example', author: 'Kent Beck', category: 'SE', availableCopies: 2 });
    const res = await request(app).get('/api/books');
    expect(res.status).to.equal(200);
    expect(res.body.data.total).to.equal(1);
    expect(res.body.data.items[0]).to.include.keys(['title', 'author', 'category', 'availableCopies']);
  });

  it('GET /api/books/:id -> returns a single book', async () => {
    const created = await Book.create({ title: 'Refactoring', author: 'Martin Fowler', category: 'SE', availableCopies: 1 });
    const res = await request(app).get(`/api/books/${created._id}`);
    expect(res.status).to.equal(200);
    expect(res.body.data).to.include({ title: 'Refactoring', author: 'Martin Fowler', category: 'SE' });
  });
});
