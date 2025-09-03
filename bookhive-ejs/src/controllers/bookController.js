import Book from "../models/Book.js";

export const listBooks = async (req, res) => {
  const q = req.query.q;
  const filter = q ? { title: { $regex: q, $options: "i" } } : {};
  const books = await Book.find(filter).sort({ createdAt: -1 });
  res.render("pages/search", { books, q: q || "" });
};

export const borrowBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) { req.session.error = "Book not found"; return res.redirect("/search"); }
  if (!book.available) { req.session.error = "Book already borrowed"; return res.redirect("/search"); }
  const days = Number(req.body.days || 14);
  book.available = false;
  book.borrowedBy = req.session.user._id;
  book.dueDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  await book.save();
  req.session.success = "Book borrowed!";
  res.redirect("/search");
};

export const returnBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) { req.session.error = "Book not found"; return res.redirect("/search"); }
  if (String(book.borrowedBy) !== String(req.session.user._id)) {
    req.session.error = "You can only return your own borrowed books";
    return res.redirect("/search");
  }
  book.available = true;
  book.borrowedBy = null;
  book.dueDate = null;
  await book.save();
  req.session.success = "Book returned!";
  res.redirect("/search");
};

export const profileBorrowed = async (req, res) => {
  const books = await Book.find({ borrowedBy: req.session.user._id }).sort({ dueDate: 1 });
  res.render("pages/profile", { books });
};

// Admin
export const adminList = async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.render("admin/books", { books });
};

export const adminNewForm = (req, res) => res.render("admin/book_form", { book: null });

export const adminCreate = async (req, res) => {
  await Book.create(req.body);
  req.session.success = "Book created";
  res.redirect("/admin/books");
};

export const adminEditForm = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) { req.session.error = "Not found"; return res.redirect("/admin/books"); }
  res.render("admin/book_form", { book });
};

export const adminUpdate = async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, req.body);
  req.session.success = "Book updated";
  res.redirect("/admin/books");
};

export const adminDelete = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  req.session.success = "Book deleted";
  res.redirect("/admin/books");
};
