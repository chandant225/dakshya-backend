const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { mongodbURL, PORT } = require("./configs/configurations");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());

mongoose
  .connect(mongodbURL, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("mongodb connection failed");
  });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const product_Route = require("./routes/productRoute");

app.use("/api/product", product_Route);
