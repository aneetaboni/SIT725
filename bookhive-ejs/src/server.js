import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";

const PORT = process.env.PORT || 5000;
http.createServer(app).listen(PORT, () => {
  console.log(`BookHive (EJS) listening on http://localhost:${PORT}`);
});
