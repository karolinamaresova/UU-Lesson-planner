const classroomDao = require("../../dao/classroom-dao.js");

async function ListAbl(req, res) {
  try {
    const classroomList = classroomDao.list();
    res.json(classroomList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
