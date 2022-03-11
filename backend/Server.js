const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001; // error - PORT was not added
const Route = require("./routes/Route");
var cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use("/user", Route); // error - Route was write as userRoute while export as Route
app.use(cors());

mongoose.connect(
  process.env.DB_CONNECTION,
  // {
  //   useNewUrlParser: "true",
  //   useUnifiedTopology: "true",
  // },
  () => {
    console.log("Connection successfull");
  }
);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
