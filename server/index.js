const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middlewares/error");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
