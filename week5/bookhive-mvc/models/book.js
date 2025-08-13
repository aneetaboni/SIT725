import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    isbn: { type: String, unique: true, sparse: true },
    copiesTotal: { type: Number, required: true, min: 0 },
    copiesAvailable: { type: Number, required: true, min: 0 },
    category: { type: String, default: "General" },
    summary: { type: String, trim: true }
  },
  { timestamps: true }
);

bookSchema.virtual("isAvailable").get(function () {
  return this.copiesAvailable > 0;
});

export default mongoose.model("Book", bookSchema);