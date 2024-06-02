const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const subjectFolderPath = path.join(__dirname, "storage", "subjectList");

// Method to read an subject from a file
function get(subjectId) {
  try {
    const filePath = path.join(subjectFolderPath, `${subjectId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadSubject", message: error.message };
  }
}

// Method to write an subject to a file
function create(subject) {
  try {
    subject.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(subjectFolderPath, `${subject.id}.json`);
    const fileData = JSON.stringify(subject);
    fs.writeFileSync(filePath, fileData, "utf8");
    return subject;
  } catch (error) {
    throw { code: "failedToCreateSubject", message: error.message };
  }
}

// Method to update subject in a file
function update(subject) {
  try {
    const currentSubject = get(subject.id);
    if (!currentSubject) return null;
    const newSubject = { ...currentSubject, ...subject };
    const filePath = path.join(subjectFolderPath, `${subject.id}.json`);
    const fileData = JSON.stringify(newSubject);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newSubject;
  } catch (error) {
    throw { code: "failedToUpdateSubject", message: error.message };
  }
}

// Method to remove an subject from a file
function remove(subjectId) {
  try {
    const filePath = path.join(subjectFolderPath, `${subjectId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveSubject", message: error.message };
  }
}

// Method to list subject in a folder
function list() {
  try {
    const files = fs.readdirSync(subjectFolderPath);
    const subjectList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(subjectFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return subjectList;
  } catch (error) {
    throw { code: "failedToListSubject", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
