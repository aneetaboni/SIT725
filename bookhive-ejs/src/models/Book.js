import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, trim: true },
    isbn: { type: String, trim: true, unique: true, sparse: true },
    description: { type: String, trim: true },
    available: { type: Boolean, default: true },
    borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    dueDate: { type: Date, default: null },
    categories: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
