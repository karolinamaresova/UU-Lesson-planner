const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/schedule/getAbl");
const ListAbl = require("../abl/schedule/listAbl");
const CreateAbl = require("../abl/schedule/createAbl");
const UpdateAbl = require("../abl/schedule/updateAbl");
//const DeleteAbl = require("../abl/schedule/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
//router.post("/delete", DeleteAbl);

module.exports = router;