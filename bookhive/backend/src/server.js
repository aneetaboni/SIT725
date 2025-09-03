import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`BookHive backend listening on http://localhost:${PORT}`);
});
