import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./db/db.js";
import userRoutes from "./routes/userRoutes.js";
import everyRoutes from "./routes/everyRoutes.js";
const app = express();
dotenv.config({});

const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDB()

app.use("/api/users", userRoutes);
app.use("/api/every", everyRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
