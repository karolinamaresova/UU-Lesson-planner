const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const studentDao = require("../../dao/student-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    name: { type: "string", minLength: 3 },
    surname: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let student = req.body;

    // validate input
    const valid = ajv.validate(schema, student);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const studentList = studentDao.list();
    const emailExists = studentList.some(
      (u) => u.email === student.email && u.id !== student.id
    );
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `Student with email ${student.email} already exists`,
      });
      return;
    }

    const updatedStudent = studentDao.update(student);
    if (!updatedStudent) {
      res.status(404).json({
        code: "studentNotFound",
        message: `Student ${student.id} not found`,
      });
      return;
    }

    res.json(updatedStudent);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
