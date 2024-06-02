const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const lessonDao = require("../../dao/lesson-dao.js");

const schema = {
  type: "object",
  properties: {
    user_id: { type: "string", minLength: 32 },
    student_id: { type: "string", minLength: 32 },
    subject_id: { type: "string", minLength: 32 },
    classroom_id: { type: "string", minLength: 32 },
    datetime: { type: "string", format: "date-time" },
    duration: { type: "number" },
    note: { type: "string" },
    
  },
  required: ["user_id", "student_id", "subject_id", "classroom_id", "datetime", "duration"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let lesson = req.body;

    // validate input
    const valid = ajv.validate(schema, lesson);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    lesson = lessonDao.create(lesson);
    res.json(lesson);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
