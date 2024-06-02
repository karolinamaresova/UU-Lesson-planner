const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const scheduleFolderPath = path.join(__dirname, "storage", "scheduleList");

// Method to read an schedule from a file
function get(scheduleId) {
  try {
    const filePath = path.join(scheduleFolderPath, `${scheduleId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadSchedule", message: error.message };
  }
}

// Method to write an schedule to a file
function create(schedule) {
  try {
    schedule.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(scheduleFolderPath, `${schedule.id}.json`);
    const fileData = JSON.stringify(schedule);
    fs.writeFileSync(filePath, fileData, "utf8");
    return schedule;
  } catch (error) {
    throw { code: "failedToCreateSchedule", message: error.message };
  }
}

// Method to update schedule in a file
function update(schedule) {
  try {
    const currentSchedule = get(schedule.id);
    if (!currentSchedule) return null;
    const newSchedule = { ...currentSchedule, ...schedule };
    const filePath = path.join(ScheduleFolderPath, `${schedule.id}.json`);
    const fileData = JSON.stringify(newSchedule);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newSchedule;
  } catch (error) {
    throw { code: "failedToUpdateSchedule", message: error.message };
  }
}

// Method to remove an schedule from a file
function remove(scheduleId) {
  try {
    const filePath = path.join(scheduleFolderPath, `${scheduleId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveSchedule", message: error.message };
  }
}

// Method to list schedule in a folder
function list() {
  try {
    const files = fs.readdirSync(scheduleFolderPath);
    const scheduleList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(scheduleFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return scheduleList;
  } catch (error) {
    throw { code: "failedToListSchedule", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
