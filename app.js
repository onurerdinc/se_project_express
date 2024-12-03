const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
mongoose.set("strictQuery", true);

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.use(errors());
app.use(requestLogger);
app.use(errorLogger);

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "test") {
    req.user = {
      _id: "5d8b8592978f8bd833ca8133",
    };
  }
  next();
});
app.use("/", mainRouter);

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
