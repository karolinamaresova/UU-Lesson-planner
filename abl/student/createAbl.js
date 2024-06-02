const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const studentDao = require("../../dao/student-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3 },
    surname: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
    date_of_birth: { type: "date" },
    note: { type: "string", format: "email" },
  },
  required: ["name", "surname", "email","date_of_birth"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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
    const emailExists = studentList.some((u) => u.email === student.email);
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `Student with email ${student.email} already exists`,
      });
      return;
    }

    student = studentDao.create(student);
    res.json(student);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
