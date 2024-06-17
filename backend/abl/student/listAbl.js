const studentDao = require("../../dao/student-dao.js");

async function ListAbl(req, res) {
  try {
    const studentList = studentDao.list();
    res.json(studentList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
