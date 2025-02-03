const express = require("express");
const router = express.Router();
const organizationController = require("../controller/organization");
// const { loginCheck } = require("../middleware/auth");


router.post("/", organizationController.postOrganization);
router.get("/", organizationController.getAllOrganization);

module.exports = router;