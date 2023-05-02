const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connection } = require("./config/db");
const { formRouter } = require("./routes/form.routes");
const { authRouter } = require("./routes/auth.routes");
const { authenticate } = require("./middleware/authenticate.middleware");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use(authenticate);
app.use("/post", formRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Server is connected to Db");
  } catch (err) {
    console.error("Something went wrong while Connecting to Db.", err);
  }
  console.log("Server is running on port", process.env.port);
});
