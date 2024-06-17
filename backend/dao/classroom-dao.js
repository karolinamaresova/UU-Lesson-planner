const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const classroomFolderPath = path.join(__dirname, "storage", "classroomList");

// Method to read an classroom from a file
function get(classroomId) {
  try {
    const filePath = path.join(classroomFolderPath, `${classroomId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadClassroom", message: error.message };
  }
}

// Method to write an classroom to a file
function create(classroom) {
  try {
    classroom.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(classroomFolderPath, `${classroom.id}.json`);
    const fileData = JSON.stringify(classroom);
    fs.writeFileSync(filePath, fileData, "utf8");
    return classroom;
  } catch (error) {
    throw { code: "failedToCreateClassroom", message: error.message };
  }
}

// Method to update classroom in a file
function update(classroom) {
  try {
    const currentClassroom = get(classroom.id);
    if (!currentClassroom) return null;
    const newClassroom = { ...currentClassroom, ...classroom };
    const filePath = path.join(classroomFolderPath, `${classroom.id}.json`);
    const fileData = JSON.stringify(newClassroom);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newClassroom;
  } catch (error) {
    throw { code: "failedToUpdateClassroom", message: error.message };
  }
}

// Method to remove an classroom from a file
function remove(classroomId) {
  try {
    const filePath = path.join(classroomFolderPath, `${classroomId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveClassroom", message: error.message };
  }
}

// Method to list classrooms in a folder
function list() {
  try {
    const files = fs.readdirSync(classroomFolderPath);
    const classroomList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(classroomFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return classroomList;
  } catch (error) {
    throw { code: "failedToListClassrooms", message: error.message };
  }
}

function addSubject(classroomId, subjectId) {
  try {
    const classroom = get(classroomId);
    if (!classroom) return null;
    if (!classroom.subjects) classroom.subjects = [];
    classroom.subjects.push(subjectId);
    return update(classroom);
  } catch (error) {
    throw { code: "failedToAddSubjectToClassroom", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  addSubject 
};
