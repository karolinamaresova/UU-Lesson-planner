const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const scheduleDao = require("../../dao/schedule-dao.js");

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
    let schedule = req.body;

    // validate input
    const valid = ajv.validate(schema, schedule);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedSchedule = scheduleDao.update(schedule);
    if (!updatedSchedule) {
      res.status(404).json({
        code: "scheduleNotFound",
        message: `Schedule ${schedule.id} not found`,
      });
      return;
    }

    res.json(updatedSchedule);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
