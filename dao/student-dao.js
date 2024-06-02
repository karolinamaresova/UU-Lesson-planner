const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const studentFolderPath = path.join(__dirname, "storage", "studentList");

// Method to read an student from a file
function get(studentId) {
  try {
    const filePath = path.join(studentFolderPath, `${studentId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadStudent", message: error.message };
  }
}

// Method to write an student to a file
function create(student) {
  try {
    student.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(studentFolderPath, `${student.id}.json`);
    const fileData = JSON.stringify(student);
    fs.writeFileSync(filePath, fileData, "utf8");
    return student;
  } catch (error) {
    throw { code: "failedToCreateStudent", message: error.message };
  }
}

// Method to update student in a file
function update(student) {
  try {
    const currentStudent = get(student.id);
    if (!currentStudent) return null;
    const newStudent = { ...currentStudent, ...student };
    const filePath = path.join(studentFolderPath, `${student.id}.json`);
    const fileData = JSON.stringify(newStudent);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newStudent;
  } catch (error) {
    throw { code: "failedToUpdateStudent", message: error.message };
  }
}

// Method to remove an student from a file
function remove(studentId) {
  try {
    const filePath = path.join(studentFolderPath, `${studentId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveStudent", message: error.message };
  }
}

// Method to list students in a folder
function list() {
  try {
    const files = fs.readdirSync(studentFolderPath);
    const studentList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(studentFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return studentList;
  } catch (error) {
    throw { code: "failedToListStudent", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
