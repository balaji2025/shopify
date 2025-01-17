const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema ({
    vendorName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true },
        match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    },
    address: {
        type: String,
    },
    status: {
        type: String,
        default: "Active",
        enum: [
            "Inactive",
            "Active"
        ],
        required: true
    },
    gstNo: {
        type: String, 
        required: true,
    },
    mobileNo: {
        type: Number,
        required: true,
    },
    alternateMobileNo: {
        type: Number,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    comments: {
        type: String,
    }
},
{ timestamps: true });

const vendorModel = mongoose.model("vendor", vendorSchema);
module.exports = vendorModel;