const organizationModel = require("../models/organization");
const { toTitleCase } = require("../config/function");
const bcrypt = require("bcryptjs");

class Organization {
  async getAllOrganization(req, res) {
    let data = await organizationModel.find();
    try {
      if (data) {
        return res.json(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async postOrganization(req, res) {
    let { organizationName, email, gstNo, address, mobileNo, status, password } = req.body;
    if (!organizationName ||!email ||!gstNo ||!address ||!mobileNo ||!status ||!password) {
        return res.status(400).json({error: "Required Field Must Be Filled"})
    }
    try {
      organizationName = toTitleCase(organizationName);
      const existingOrganization = await organizationModel.findOne({ email });
      if (existingOrganization) {
        return res.status(400).json({ error: "Organization Already Exist" });
      }
      const saltRounds = 10;  // Adjust as needed
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newOrganization = new organizationModel({
        organizationName,
        email,
        gstNo,
        address,
        mobileNo,
        status,
        password: hashedPassword 
      });
      
      await newOrganization.save();
      res.status(201).json({ sucess: "Organization Created Sucessfully" });
    } catch (error) {
      console.log("error start");
      console.log(error);
    }
  }
}

module.exports = new Organization();
