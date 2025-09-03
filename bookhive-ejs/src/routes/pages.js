import { Router } from "express";
import { home } from "../controllers/pageController.js";
import { ensureAuth } from "../middleware/auth.js";
import { listBooks, borrowBook, returnBook, profileBorrowed } from "../controllers/bookController.js";

const router = Router();

router.get("/", home);
router.get("/search", listBooks);
router.post("/books/:id/borrow", ensureAuth, borrowBook);
router.post("/books/:id/return", ensureAuth, returnBook);
router.get("/profile", ensureAuth, profileBorrowed);

export default router;
