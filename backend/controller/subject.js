const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/subject/getAbl");
const ListAbl = require("../abl/subject/listAbl");
const CreateAbl = require("../abl/subject/createAbl");
const UpdateAbl = require("../abl/subject/updateAbl");
//const DeleteAbl = require("../abl/subject/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
//router.post("/delete", DeleteAbl);

module.exports = router;