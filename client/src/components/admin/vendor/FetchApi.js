import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

const BearerToken = () =>
    localStorage.getItem("jwt")
        ? JSON.parse(localStorage.getItem("jwt")).token
        : false;
const Headers = () => {
    return {
        headers: {
            token: `Bearer ${BearerToken()}`,
        },
    };
};

export const getAllVendor = async () => {
    try {
        let res = await axios.get(`${apiURL}/api/vendor/all-vendor`, Headers());
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createVendor = async ({
    vendorName,
    email,
    address,
    gstNo,
    mobileNo,
    alternateMobileNo
}) => {
    let formData = new FormData();
    formData.append("vendorName", vendorName);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("gstNo", gstNo);
    formData.append("mobileNo", mobileNo);
    formData.append("alternateMobileNo", alternateMobileNo);
    try {
        let result = await axios.post(
            `${apiURL}/api/vendor/create-vendor`,
            formData,
            Headers()
        );
        return result.data;
    } catch (error) {
        console.log(error)
    }
};

export const editVendor = async ({
    vId,
    vendorName,
    email,
    address,
    gstNo,
    mobileNo,
    alternateMobileNo
}) => {
    let data = { vId: vId, vendorName: vendorName, email: email, address: address, gstNo: gstNo, mobileNo: mobileNo, alternateMobileNo: alternateMobileNo };
    try {
        let result = await axios.put(`${apiURL}/api/vendor/edit-vendor`, data, Headers());
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteVendorById = async (vId) => {
    try {
        let result = await axios.delete(`${apiURL}/api/vendor/delete-vendorById`, { vId }, Headers());
        return result.data;
    } catch (error) {
        console.log(error);
    }
}