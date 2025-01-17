const express = require('express');
const router  = express.Router();
const vendorController = require("../controller/vendor");
const { loginCheck } = require("../middleware/auth");
// const obj = { }

router.get("/all", loginCheck, vendorController.getAllVendor);
router.post("/", loginCheck, vendorController.postAddVendor);
router.put("/:id", loginCheck, vendorController.putEditVendor);
router.delete("/byId/:id", loginCheck, vendorController.deleteVendor);
router.get("/byId/:id", loginCheck, vendorController.getVendorByID);

module.exports = router;