const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const userController = require("./controller/user");



app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());


app.use("/user", userController);




app.get("/", (req, res) => {
    res.send("Hello World!");
  });



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  