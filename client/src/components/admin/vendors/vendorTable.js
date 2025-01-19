import React, { Fragment, useContext, useEffect, useState } from "react";
import { getAllVendor, deleteVendorById } from "./FetchApi";
import moment from "moment";
import { VendorContext } from "./index";

const apiURL = process.env.REACT_APP_API_URL;

const AllVendor = (props) => {
  const { data, dispatch } = useContext(VendorContext);
  const { vendors } = data;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let responseData = await getAllVendor();
    setTimeout(() => {
      if (responseData && responseData.Vendors) {
        dispatch({
          type: "fetchVendorsAndChangeState",
          payload: responseData.Vendors,
        });
        setLoading(false);
      }
    }, 1000);
  };

  const deleteVendorReq = async (id) => {
    let deleteVendor = await deleteVendorById(id);
    if (deleteVendor.error) {
      console.log(deleteVendor.error);
    } else if (deleteVendor.success) {
      console.log(deleteVendor.success);
      fetchData();
    }
  };

  /* This method call the editmodal & dispatch product context */
  const editVendor = (id, vendor, type) => {
    if (type) {
      dispatch({
        type: "editVendorModalOpen",
        vendor: { ...vendor, id: id },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">VendorName</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">GstNo</th>
              <th className="px-4 py-2 border">MobileNo</th>
              <th className="px-4 py-2 border">AlternateMobileNo</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th>
              <th className="px-4 py-2 border">Comments</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors && vendors.length > 0 ? (
              vendors.map((item, key) => {
                return (
                  <VendorTable
                    vendor={item}
                    editVendor={(id, vendor, type) =>
                        editVendor(id, vendor, type)
                    }
                    deleteVendor={(id) => deleteVendorReq(id)}
                    key={key}
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-xl text-center font-semibold py-8"
                >
                  No vendor found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {vendors && vendors.length} vendor found
        </div>
      </div>
    </Fragment>
  );
};

/* Single Product Component */
const VendorTable = ({ vendor, deleteVendor, editVendor }) => {
  return (
    <Fragment>
      <tr>
        <td className="p-2 text-left">
          {vendor.vendorName.length > 15
            ? vendor.vendorName.substring(1, 15) + "..."
            : vendor.vendorName}
        </td>
        <td className="p-2 text-left">
          {vendor.email.slice(0, 15)}...
        </td>
        <td className="p-2 text-center">
          {vendor.status === "Active" ? (
            <span className="bg-green-200 rounded-full text-center text-xs px-2 font-semibold">
              {vendor.status}
            </span>
          ) : (
            <span className="bg-red-200 rounded-full text-center text-xs px-2 font-semibold">
              {vendor.status}
            </span>
          )}
        </td>
        <td className="p-2 text-center">{vendor.GstNo}</td>
        <td className="p-2 text-center">{vendor.mobileNo}</td>
        <td className="p-2 text-center">{vendor.alternateMobileNo}</td>
        <td className="p-2 text-center">{vendor.createdAt}</td>
        <td className="p-2 text-center">{vendor.updatedAt}</td>
        <td className="p-2 text-center">{vendor.comments}</td>
        <td className="p-2 text-center">
          {moment(vendor.createdAt).format("lll")}
        </td>
        <td className="p-2 text-center">
          {moment(vendor.updatedAt).format("lll")}
        </td>
        <td className="p-2 flex items-center justify-center">
          <span
            onClick={(e) => editVendor(vendor._id, vendor, true)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 fill-current text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span
            onClick={(e) => deleteVendor(vendor._id)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 fill-current text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </td>
      </tr>
    </Fragment>
  );
};

export default AllVendor;