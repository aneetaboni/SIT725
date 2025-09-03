import "dotenv/config";
import mongoose from "mongoose";
import User from "../src/models/User.js";
import Book from "../src/models/Book.js";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/bookhive";

async function run() {
  await mongoose.connect(uri);
  await Promise.all([User.deleteMany({}), Book.deleteMany({})]);

  const admin = await User.create({ name: "Admin", email: "admin@bookhive.local", password: "password", role: "admin" });
  const student = await User.create({ name: "Student", email: "student@bookhive.local", password: "password", role: "student" });

  await Book.insertMany([
    { title: "Clean Code", author: "Robert C. Martin", isbn: "9780132350884", description: "Agile Software Craftsmanship" },
    { title: "The Pragmatic Programmer", author: "Andrew Hunt, David Thomas", isbn: "9780201616224" },
    { title: "Design Patterns", author: "Gamma, Helm, Johnson, Vlissides", isbn: "9780201633610" }
  ]);

  console.log("Seeded users:", admin.email, student.email);
  console.log("Seeded books: 3");
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });
