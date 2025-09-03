/**
 * Simple seed script to insert sample users and books.
 * Usage: node database/seed.js
 */
import "dotenv/config";
import mongoose from "mongoose";
import Book from "../backend/src/models/Book.js";
import User from "../backend/src/models/User.js";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/bookhive";

async function run() {
  await mongoose.connect(uri);
  await Promise.all([Book.deleteMany({}), User.deleteMany({})]);

  const admin = await User.create({ name: "Admin", email: "admin@bookhive.local", password: "password", role: "admin" });
  const student = await User.create({ name: "Student", email: "student@bookhive.local", password: "password", role: "student" });

  const books = await Book.insertMany([
    { title: "Clean Code", author: "Robert C. Martin", isbn: "9780132350884", description: "Handbook of Agile Software Craftsmanship" },
    { title: "The Pragmatic Programmer", author: "Andrew Hunt, David Thomas", isbn: "9780201616224" },
    { title: "Design Patterns", author: "Erich Gamma et al.", isbn: "9780201633610" }
  ]);

  console.log("Seeded:", { admin: admin.email, student: student.email, books: books.length });
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });
