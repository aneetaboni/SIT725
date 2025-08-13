import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import morgan from "morgan";
import "./config/db.js";
import indexRouter from "./routes/index.js";
import bookRouter from "./routes/books.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "partials/layout");

// Routes
app.use("/", indexRouter);
app.use("/books", bookRouter);

// 404 handler
app.use((req, res) => {
  res.status(404);
  res.render("partials/error", { title: "Not Found", message: "Page not found" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`BookHive running on http://localhost:${port}`);
});