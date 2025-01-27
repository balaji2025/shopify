const { toTitleCase } = require("../config/function");
const vendorModel = require("../models/vendor");

class Vendor {
  async getAllVendor(req, res) {
    try {
      let vendor = await vendorModel.find().sort({ _id: -1 });
      // let obj = {allVendor: vendor}
      if (vendor) {
        return res.json(vendor);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // TODO: getVendorByID to implement i've to check the type to validate data
  async getVendorByID(req, res) {
    let { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Vendor ID is required" });
    }
    try {
      let vendorById = await vendorModel.findById(id);
      return res.json(vendorById);
    } catch (error) {
      console.log(error);
    }
  }

  async postAddVendor(req, res) {
    let {
      vendorName,
      email,
      address,
      status,
      gstNo,
      mobileNo,
      alternateMobileNo,
      comments,
    } = req.body;
    try {
      if (
        !vendorName ||
        !email ||
        !address ||
        !status ||
        !gstNo ||
        !mobileNo ||
        !alternateMobileNo
      ) {
        return res
          .status(400)
          .json({ error: "Required field must be filled!" });
      }

      vendorName = toTitleCase(vendorName);

      const existingVendor = await vendorModel.findOne({ email });
      if (existingVendor) {
        return res
          .status(400)
          .json({ error: "Vendor with this emailalready exist" });
      }

      const newVendor = new vendorModel({
        vendorName,
        email,
        address,
        status,
        gstNo,
        mobileNo,
        alternateMobileNo,
        comments,
      });

      await newVendor.save();
      res.status(201).json({ success: "Vendor created successfully" });
    } catch (error) {
      console.error("Error adding vendor", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  //i've to change put
  async putEditVendor(req, res) {
    let { id } = req.params;
    let {
      vendorName,
      email,
      address,
      status,
      gstNo,
      mobileNo,
      alternateMobileNo,
      comments,
    } = req.body;
    if (
      !vendorName ||
      !email ||
      !status ||
      !gstNo ||
      !mobileNo ||
      !alternateMobileNo
    ) {
      return res
        .status(400)
        .json({ error: "Required Filed Must Not Be Empty!" });
    }
    try {
      let editVendor = await vendorModel.findByIdAndUpdate(id, {
        vendorName,
        email,
        address,
        status,
        gstNo,
        mobileNo,
        alternateMobileNo,
        comments,
        updatedAt: Date.now(),
      });
      let edit = await editVendor.save();
      if (edit) {
        return res.json({ success: "Vendor edit successfully" });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteVendor(req, res) {
    let { id } = req.params;
    let { comments } = req.body;
    let { status } = req.body;
    let deletedVendor = await vendorModel.findById(id);
    try {
      if (!id) {
        return res
          .status(400)
          .json({
            error:
              "Vendor ID is required and You can only change the status of the vendor!",
          });
      }
      if (!comments) {
        return res
          .status(400)
          .json({ error: "Comments is mandatory when changing the statusxt" });
      }
      if (status) {
        // deletedVendor.status = "Inactive";
        // return res.json(deletedVendor);
        deletedVendor.comments = comments;
        deletedVendor.status = status;
        deletedVendor.updatedAt = Date.now();
        await deletedVendor.save();
        if (deletedVendor) {
          return res
            .status(200)
            .json({
              success: "Changed the status of Vendor as per your request!",
            });
        } else {
          return res.status(404).json({ error: "Vendor not found!" });
        }
        // return res.json(deletedVendor);
      }
    } catch (error) {
      console.error("Error When Changing The Vendor Status:", error);
      return res.status(500).json({ error: "Internal server error!" });
    }
  }
}

module.exports = new Vendor();