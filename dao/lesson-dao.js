const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const lessonFolderPath = path.join(__dirname, "storage", "lessonList");

// Method to read an lesson from a file
function get(lessonId) {
  try {
    const filePath = path.join(lessonFolderPath, `${lessonId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadLesson", message: error.message };
  }
}

// Method to write an lesson to a file
function create(lesson) {
  try {
    lesson.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(lessonFolderPath, `${lesson.id}.json`);
    const fileData = JSON.stringify(lesson);
    fs.writeFileSync(filePath, fileData, "utf8");
    return lesson;
  } catch (error) {
    throw { code: "failedToCreateLesson", message: error.message };
  }
}

// Method to update lesson in a file
function update(lesson) {
  try {
    const currentLesson = get(lesson.id);
    if (!currentLesson) return null;
    const newLesson = { ...currentLesson, ...lesson };
    const filePath = path.join(LessonFolderPath, `${lesson.id}.json`);
    const fileData = JSON.stringify(newLesson);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newLesson;
  } catch (error) {
    throw { code: "failedToUpdateLesson", message: error.message };
  }
}

// Method to remove an lesson from a file
function remove(lessonId) {
  try {
    const filePath = path.join(lessonFolderPath, `${lessonId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveLesson", message: error.message };
  }
}

// Method to list lesson in a folder
function list() {
  try {
    const files = fs.readdirSync(lessonFolderPath);
    const lessonList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(lessonFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return lessonList;
  } catch (error) {
    throw { code: "failedToListLessone", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
