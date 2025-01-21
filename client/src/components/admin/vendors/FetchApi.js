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
        let res = await axios.get(`${apiURL}/api/vendor/all`, Headers());
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createVendor = async ({
    vendorName,
    email,
    address,
    status,
    gstNo,
    mobileNo,
    alternateMobileNo,
    comments
}) => {
    let formData = new FormData();
    formData.append("vendorName", vendorName);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("status", status);
    formData.append("gstNo", gstNo);
    formData.append("mobileNo", mobileNo);
    formData.append("alternateMobileNo", alternateMobileNo);
    formData.append("comments", comments);
    try {
        console.log("started"); 
        let result = await axios.post(`${apiURL}/api/vendor/`, formData, Headers());
        console.log(result);
        return result.data;
    } catch (error) {
        console.log(error)
    }
};

export const editVendor = async ({
    id,
    vendorName,
    email,
    address,
    status,
    gstNo,
    mobileNo,
    alternateMobileNo,
    comments
}) => {
    let data = { id: id, vendorName: vendorName, email: email, address: address, status: status, gstNo: gstNo, mobileNo: mobileNo, alternateMobileNo: alternateMobileNo, comments:comments };
    try {
        let result = await axios.put(`${apiURL}/api/vendor/:id`, data, Headers());
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteVendorById = async (id) => {
    try {
        let result = await axios.delete(`${apiURL}/api/vendor/byId/:id`, Headers());
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getVendorById = async (id) => {
    try {
        let result  = await axios.get(`${apiURL}/api/vendor/byId/:id`, Headers());
        return result.data;
    } catch (error) {
        console.log(error);
    }
}