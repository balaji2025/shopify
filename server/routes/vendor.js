const express = require('express');
const router  = express.Router();
const vendorController = require("../controller/vendor");
const { loginCheck } = require("../middleware/auth");
// const obj = { }

router.get("/all-vendor", loginCheck, vendorController.getAllVendor);
router.post("/create-vendor", loginCheck, vendorController.postAddVendor);
router.put("/edit-vendor", loginCheck, vendorController.putEditVendor);
router.delete("/delete-vendor", loginCheck, vendorController.getDeleteVendor);

module.exports = router;