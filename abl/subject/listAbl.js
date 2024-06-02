const subjectDao = require("../../dao/subject-dao.js");

async function ListAbl(req, res) {
  try {
    const subjectList = subjectDao.list();
    res.json(subjectList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
