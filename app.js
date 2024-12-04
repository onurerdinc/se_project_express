const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { errors } = require("celebrate");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

mongoose.set("strictQuery", true);

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(cors());

app.use(requestLogger);
app.use("/", mainRouter);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "test") {
    req.user = {
      _id: "5d8b8592978f8bd833ca8133",
    };
  }
  next();
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`App is listening at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
