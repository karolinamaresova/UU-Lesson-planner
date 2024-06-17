const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3 },
    surname: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
    role : { type: "string", enum: ["admin", "teacher"] },
    subject_id: { type: "array", items: { type: "string", minLength: 32 }
     }
  },
  required: ["name", "surname", "email", "role"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let userRequest = req.body;

    // validate input
    const valid = ajv.validate(schema, userRequest);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const userList = userDao.list();
    const emailExists = userList.some((u) => u.email === userRequest.email);
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `User with email ${userRequest.email} already exists`,
      });
      return;
    }

    var user = userDao.create(userRequest);

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
