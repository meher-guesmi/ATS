const express = require("express");
const cors = require("cors");
const product = require("./api/product/product.routes");
const app = express();

app.use(cors());




const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbConfig = require("./config/db.config");
mongoose
  .connect(`mongodb+srv://${dbConfig.user}:${dbConfig.pwd}@${dbConfig.domain}/${dbConfig.DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


//Home Page
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

//Routes
app.use("/api/products", product);

module.exports = app;