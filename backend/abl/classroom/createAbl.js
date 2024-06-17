const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const classroomDao = require("../../dao/classroom-dao.js");

const schema = {
  type: "object",
  properties: {
    label: { type: "string" },
    
    
    
  },
  required: ["label"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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

    
    

    classroom = classroomDao.create(classroom);
    res.json(classroom);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
