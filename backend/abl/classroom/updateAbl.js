const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const classroomDao = require("../../dao/classroom-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    label: { type: "string" }
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let classroom = req.body;

    // validate input
    const valid = ajv.validate(schema, classroom);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

   

    const updatedClassroom = classroomDao.update(classroom);
    if (!updatedClassroom) {
      res.status(404).json({
        code: "classroomNotFound",
        message: `Classroom ${classroom.id} not found`,
      });
      return;
    }

    res.json(updatedClassroom);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
