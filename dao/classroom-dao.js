const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const userFolderPath = path.join(__dirname, "storage", "userList");

// Method to read an user from a file
function get(classroomId) {
  try {
    const filePath = path.join(userFolderPath, `${classroomId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadUser", message: error.message };
  }
}

// Method to write an user to a file
function create(classroom) {
  try {
    user.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(userFolderPath, `${classroom.id}.json`);
    const fileData = JSON.stringify(user);
    fs.writeFileSync(filePath, fileData, "utf8");
    return user;
  } catch (error) {
    throw { code: "failedToCreateUser", message: error.message };
  }
}

// Method to update user in a file
function update(classroom) {
  try {
    const currentUser = get(classroom.id);
    if (!currentUser) return null;
    const newUser = { ...currentUser, ...user };
    const filePath = path.join(userFolderPath, `${classroom.id}.json`);
    const fileData = JSON.stringify(newUser);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newClassroom;
  } catch (error) {
    throw { code: "failedToUpdateUser", message: error.message };
  }
}

// Method to remove an user from a file
function remove(classroomId) {
  try {
    const filePath = path.join(classroomFolderPath, `${classroomId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveUser", message: error.message };
  }
}

// Method to list users in a folder
function list() {
  try {
    const files = fs.readdirSync(classroomFolderPath);
    const classroomList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(classroomFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return classroomList;
  } catch (error) {
    throw { code: "failedToListUsers", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
