import { Router } from "express";
import { ensureAdmin } from "../middleware/auth.js";
import { adminList, adminNewForm, adminCreate, adminEditForm, adminUpdate, adminDelete } from "../controllers/bookController.js";

const router = Router();

router.use(ensureAdmin);
router.get("/books", adminList);
router.get("/books/new", adminNewForm);
router.post("/books", adminCreate);
router.get("/books/:id/edit", adminEditForm);
router.post("/books/:id?_method=PUT", adminUpdate);
router.post("/books/:id?_method=DELETE", adminDelete);

export default router;
