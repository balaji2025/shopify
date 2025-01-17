const { toTitleCase } = require("../config/function");
const vendorModel = require("../models/vendor");

class Vendor {
    async getAllVendor(req, res) {
        try {
            console.log("123");
            let vendor = await vendorModel.find();
            console.log(vendor);
            if(vendor) {
                return res.json({vendor});
            }
        } catch(error) {
            console.log(error);
        }
    }
    
    // TODO: getVendorByID to implement i've to check the type to validate data
    async getVendorByID(req, res) {
        let {vId} = req.body;
        if (!vId) {
            return res.status(400).json({ error: "Vendor ID is required"})
        }
        try {
            let vendorById = await vendorModel.findById(vId);
            return res.json({vendorById});
        } catch (error) {
            console.log(error);
        }
    }

    async postAddVendor(req, res) {
        let {vendorName, email, address, gstNo, mobileNo, alternateMobileNo} = req.body;
        try {
            if (!vendorName || !email || !address || !gstNo || !mobileNo || !alternateMobileNo) {
                return res.status(400).json({ error: "All fields are required!" });
            }
    
            vendorName = toTitleCase(vendorName);
    
            const existingVendor = await vendorModel.findOne({email});
            if (existingVendor) {
                return res.status(400).json({ error: "Vendor with this emailalready exist"})
            }
    
            const newVendor = new vendorModel({
                vendorName,
                email,
                address,
                gstNo,
                mobileNo,
                alternatMobileNo
            });
    
            await newVendor.save();
            res.statu(201).json({ message: "Vendor added sucessfully", vendor: newVendor});
        } catch (error) {
            console.error("Error adding vendor", error);
            res.status(500).json({ error: "Internal server error"})
        }
    }


    //i've to change put
    async putEditVendor(req, res) {
        let {vendorName, email, address, gstNo, mobileNo} = req.body;
        if (!vendorName || !email || !address || !gstNo || !mobileNo) {
            return res.status(400).json({ error: "All fields are required!" });
        }
        try {
            let editVendor = await vendorModel.findByIdAndUpdate(vId, {
                vendorName,
                email,
                address,
                gstNo,
                mobileNo,
                updatedAt: Date.now()
            });
            let edit = await editVendor.exec();
            if (edit) {
                return res.json({ success: "Vendor edit successfully" });
              }
        } catch (error) {
            console.error(error);
        }
    }

    async getDeleteVendor(req, res) {
        try {
            let { vId } = req.body;
    
            if (!vId) {
                return res.status(400).json({ error: "Vendor ID is required!" });
            }
    
            let deletedVendor = await vendorModel.findByIdAndDelete(vId);
    
            if (deletedVendor) {
                return res.status(200).json({ message: "Vendor deleted successfully!", vendor: deletedVendor });
            } else {
                return res.status(404).json({ error: "Vendor not found!" });
            }
        } catch (error) {
            console.error("Error deleting vendor:", error);
            return res.status(500).json({ error: "Internal server error!" });
        }
    }
}

module.exports = new Vendor();