const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
    {
        organizationName: {
            type : String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            index: { unique: true },
            match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        },
        gstNo: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        mobileNo: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            default: "ACTIVE",
            enum: [
              "ACTIVE",
              "INACTIVE",
            ],
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const organizationModel = mongoose.model("organization", organizationSchema)
module.exports =  organizationModel