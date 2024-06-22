const lessonDao = require("../../dao/lesson-dao.js");

async function ListAbl(req, res) {
  try {
    const lessonList = lessonDao.list();
    res.json(lessonList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
