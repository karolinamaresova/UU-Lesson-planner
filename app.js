const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const userController = require("./controller/user");
//const subjectController = require("./controller/subject");
//const studentController = require("./controller/student");
const classroomController = require("./controller/classroom");
//const scheduleController = require("./controller/schedule");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/user", userController);
//app.use("/subject", subjectController);
//app.use("/student", studentController);
app.use("/classroom", classroomController);
//app.use("/schedule", scheduleController);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  