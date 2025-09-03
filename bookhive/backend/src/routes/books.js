import express from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import { getBooks, getBook, createBook, updateBook, deleteBook, borrowBook, returnBook } from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", protect, adminOnly, createBook);
router.put("/:id", protect, adminOnly, updateBook);
router.delete("/:id", protect, adminOnly, deleteBook);
router.post("/:id/borrow", protect, borrowBook);
router.post("/:id/return", protect, returnBook);

export default router;
