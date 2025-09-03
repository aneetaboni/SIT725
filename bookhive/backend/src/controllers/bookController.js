import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
  const q = req.query.q;
  const filter = q ? { title: { $regex: q, $options: "i" } } : {};
  const books = await Book.find(filter).sort({ createdAt: -1 });
  res.json(books);
};

export const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

export const createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

export const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

export const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json({ message: "Book removed" });
};

export const borrowBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  if (!book.available) return res.status(400).json({ message: "Book already borrowed" });
  book.available = false;
  book.borrowedBy = req.user._id;
  const days = Number(req.body.days || 14);
  book.dueDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  await book.save();
  res.json(book);
};

export const returnBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  book.available = true;
  book.borrowedBy = null;
  book.dueDate = null;
  await book.save();
  res.json(book);
};
