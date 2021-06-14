const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 7000;
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());

const adminRouter = require("./routes");
app.use("/", adminRouter);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});