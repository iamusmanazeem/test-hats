const express = require("express");
const mongoose = require("mongoose");
const product = require("./routes/products");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();
var cors = require('cors')


mongoose
  .connect("mongodb+srv://bilalash:salesforce@123@cluster0.dghlp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connect to mongodb"))
  .catch((err) => console.log("could not connect to mongodb"));

app.use(cors())
app.use(express.json());
app.use("/api/products", product);
app.use("/api/users", users);
app.use("/api/auth", auth);

console.log("here");

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
