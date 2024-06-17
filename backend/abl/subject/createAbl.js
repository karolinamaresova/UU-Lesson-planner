const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const subjectDao = require("../../dao/subject-dao.js");
const classroomDao = require("../../dao/classroom-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3 },
    classroom_id: { type: "string", minLength: 32 },
  },
  required: ["name", "classroom_id"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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

    

    subject = subjectDao.create(subject);
    classroomDao.addSubject(subject.classroom_id, subject.id);
    res.json(subject);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
