import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import morgan from "morgan";
import methodOverride from "method-override";
import session from "express-session";
import MongoStore from "connect-mongo";
import connectDB from "./config/db.js";
import pageRoutes from "./routes/pages.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import { attachUserToLocals } from "./middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const app = express();
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(morgan("dev"));

const sessionSecret = process.env.SESSION_SECRET || "dev_secret";
const mongoUrl = process.env.MONGO_URI;

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: mongoUrl ? MongoStore.create({ mongoUrl, collectionName: "sessions" }) : undefined,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
  })
);

app.use(attachUserToLocals);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", pageRoutes);
app.use("/", authRoutes);
app.use("/admin", adminRoutes);

app.use((req, res) => res.status(404).render("pages/404"));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("pages/error", { message: err.message || "Server error" });
});

export default app;
