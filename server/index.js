const express = require("express");
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/database");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
