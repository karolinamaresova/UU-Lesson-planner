const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/classroom/getAbl");
const ListAbl = require("../abl/classroom/listAbl");
const CreateAbl = require("../abl/classroom/createAbl");
const UpdateAbl = require("../abl/classroom/updateAbl");
//const DeleteAbl = require("../abl/classroom/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
//router.post("/delete", DeleteAbl);

module.exports = router;