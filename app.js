const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const clothingItems = require("./models/clothingItems");

const app = express();

const { PORT = 3001 } = process.env;

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(console.error);

app.use("/", mainRouter);
app.use("/clothingItems", clothingItems);
app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
