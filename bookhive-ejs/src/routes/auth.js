import { Router } from "express";
import { body } from "express-validator";
import { getLogin, postLogin, getRegister, postRegister, postLogout } from "../controllers/authController.js";

const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/register", getRegister);
router.post("/register",
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  postRegister
);
router.post("/logout", postLogout);

export default router;
