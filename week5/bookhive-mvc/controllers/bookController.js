import Book from "../models/book.js";

export async function list(req, res) {
  const q = req.query.q?.trim() || "";
  const filter = q ? { title: { $regex: q, $options: "i" } } : {};
  const books = await Book.find(filter).sort({ createdAt: -1 }).lean();
  res.render("books/list", { title: "Books", books, q });
}

export function newForm(req, res) {
  res.render("books/new", { title: "Add Book" });
}

export async function create(req, res) {
  const { title, author, isbn, copiesTotal, copiesAvailable, category, summary } = req.body;
  const book = new Book({ title, author, isbn, copiesTotal, copiesAvailable, category, summary });
  await book.save();
  res.redirect("/books");
}

export async function editForm(req, res) {
  const book = await Book.findById(req.params.id).lean();
  if (!book) return res.status(404).render("partials/error", { title: "Not Found", message: "Book not found" });
  res.render("books/edit", { title: "Edit Book", book });
}

export async function update(req, res) {
  const { title, author, isbn, copiesTotal, copiesAvailable, category, summary } = req.body;
  await Book.findByIdAndUpdate(req.params.id, { title, author, isbn, copiesTotal, copiesAvailable, category, summary });
  res.redirect("/books");
}

export async function remove(req, res) {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect("/books");
}