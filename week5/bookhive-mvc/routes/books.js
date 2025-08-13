import { Router } from "express";
import { list, newForm, create, editForm, update, remove } from "../controllers/bookController.js";

const router = Router();

router.get("/", list);
router.get("/new", newForm);
router.post("/", create);
router.get("/:id/edit", editForm);
router.post("/:id", update);
router.post("/:id/delete", remove);

export default router;