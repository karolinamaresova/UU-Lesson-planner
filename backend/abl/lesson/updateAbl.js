const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

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
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
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

    const updatedLesson = lessonDao.update(lesson);
    if (!updatedLesson) {
      res.status(404).json({
        code: "lessonNotFound",
        message: `Lesson ${lesson.id} not found`,
      });
      return;
    }

    res.json(updatedLesson);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
