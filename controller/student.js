const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/student/getAbl");
const ListAbl = require("../abl/student/listAbl");
const CreateAbl = require("../abl/student/createAbl");
const UpdateAbl = require("../abl/student/updateAbl");
//const DeleteAbl = require("../abl/student/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
//router.post("/delete", DeleteAbl);

module.exports = router;