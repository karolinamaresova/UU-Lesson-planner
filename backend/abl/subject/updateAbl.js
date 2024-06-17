const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const subjectDao = require("../../dao/subject-dao.js");

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
    let subject = req.body;

    // validate input
    const valid = ajv.validate(schema, subject);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedSubject = subjectDao.update(subject);
    if (!updatedSubject) {
      res.status(404).json({
        code: "subjectNotFound",
        message: `Subject ${subject.id} not found`,
      });
      return;
    }

    res.json(updatedSubject);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
