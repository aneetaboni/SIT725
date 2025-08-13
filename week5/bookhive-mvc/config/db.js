import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/bookhive";

mongoose.set("strictQuery", true);

mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

export default mongoose;