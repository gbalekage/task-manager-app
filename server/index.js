const express = require("express");
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(notFound)
app.use(errorHandler)
app.listen(port, () => console.log(`Server running on port ${port}`));
