import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

// routes import
import ProductRoutes from "./routes/product.js";
import BlogRoutes from "./routes/blog.js";
import MessageRoutes from "./routes/message.js";
import AuthRoutes from "./routes/auth.js";
import WishListRoutes from "./routes/wishList.js";
import CompareRoutes from "./routes/compare.js";
import QuestionRoutes from "./routes/question.js";
import UserRoutes from "./routes/user.js";
import CartRoutes from "./routes/cart.js";
import CitiesRoutes from "./routes/cities.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// database
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log("connect database successful");
  } catch (error) {
    console.log("connect database failed:", error.message);
  }
};

// middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());


// routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/product", ProductRoutes);
app.use("/api/v1/blog", BlogRoutes);
app.use("/api/v1/message", MessageRoutes);
app.use("/api/v1/wishList", WishListRoutes);
app.use("/api/v1/compare", CompareRoutes);
app.use("/api/v1/question", QuestionRoutes);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/cart", CartRoutes);
app.use("/api/v1/cities", CitiesRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`connect sever successfull at ${port}`);
});
