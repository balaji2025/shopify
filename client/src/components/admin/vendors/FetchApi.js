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

export const createVendor = async (data) => {
    try {
        console.log("started"); 
        let result = await axios.post(`${apiURL}/api/vendor`, data, Headers());
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
    let data = { id: id, vendorName: vendorName, email: email, address: address, status: status, gstNo: gstNo, mobileNo: mobileNo, alternateMobileNo: alternateMobileNo, comments: comments };
    try {
        let result = await axios.put(`${apiURL}/api/vendor/${id}`, data, Headers());
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteVendorById = async (id) => {
    try {
        let result = await axios.delete(`${apiURL}/api/vendor/by-id/${id}`, Headers());
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getVendorById = async (id) => {
    try {
        let result  = await axios.get(`${apiURL}/api/vendor/by-id/${id}`, Headers());
        return result.data;
    } catch (error) {
        console.log(error);
    }
}