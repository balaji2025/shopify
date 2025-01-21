const { toTitleCase } = require("../config/function");
const vendorModel = require("../models/vendor");

class Vendor {
    async getAllVendor(req, res) {
        try {
            let vendor = await vendorModel.find().sort({ _id: -1 });
            // let obj = {allVendor: vendor}
            if(vendor) {
                return res.json(vendor);
            }
        } catch(error) {
            console.log(error);
        }
    }
    
    // TODO: getVendorByID to implement i've to check the type to validate data
    async getVendorByID(req, res) {
        let {id} = req.params;
        if (!id) {
            return res.status(400).json({ error: "Vendor ID is required"})
        }
        try {
            let vendorById = await vendorModel.findById(id);
            return res.json(vendorById);
        } catch (error) {
            console.log(error);
        }
    }

    async postAddVendor(req, res) {
        let {vendorName, email, address, status, gstNo, mobileNo, alternateMobileNo, comments} = req.body;
        try {
            if (!vendorName || !email || !address ||!status ||!gstNo || !mobileNo || !alternateMobileNo) {
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
                status,
                gstNo,
                mobileNo,
                alternateMobileNo,
                comments,
                createdAt
            });
    
            await newVendor.save();
            res.status(201).json(newVendor);
        } catch (error) {
            console.error("Error adding vendor", error);
            res.status(500).json({ error: "Internal server error"})
        }
    }


    //i've to change put
    async putEditVendor(req, res) {
        let {id} = req.params;
        let {vendorName, email, address, status, gstNo, mobileNo, alternateMobileNo,  comments} = req.body;
        if (!vendorName || !email ||!status || !gstNo || !mobileNo ||!alternateMobileNo ||!comments) {
            return res.status(400).json({ error: "Required Filed Must Not Be Empty!" });
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
                updatedAt: Date.now()
            });
            let edit = await editVendor.save();
            if (edit) {
                return res.json(edit);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async deleteVendor(req, res) {
        
        let { id } = req.params;
        try {
            console.log(id);
    
            if (!id) {
                return res.status(400).json({ error: "Vendor ID is required and You can only change the status of the vendor!" });
            }
            
            let deletedVendor = await vendorModel.findById(id);
            if (deletedVendor.status == "Active") {
                deletedVendor.status = "Inactive";
                deletedVendor.updatedAt = Date.now();
            }
    
            if (deletedVendor) {
                return res.status(200).json({ message: "Changed the vendor status to Inactive!"});
            } else {
                return res.status(404).json({ error: "Vendor not found!" });
            }
        } catch (error) {
            console.error("Error When Changing The Vendor Status:", error);
            return res.status(500).json({ error: "Internal server error!" });
        }
    }
}

module.exports = new Vendor();