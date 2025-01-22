import React, { Fragment, useContext, useState, useEffect } from "react";
import { VendorContext } from "./index";
import  {editVendor, getAllVendor } from "./FetchApi";


const EditVendorModal = (props) => {
  const { data, dispatch } = useContext(VendorContext);

  const [ setVendors] = useState(null);

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [editformData, setEditformdata] = useState({
    id: "",
    vendorName: "",
    email: "",
    address: "",
    status: "",
    gstNo: "",
    mobileNo: "",
    alternateMobileNo: "",
    comments: "",
    error: false,
    success: false,
  });

  useEffect(() => {
    fetchVendorData();
  }, []);

  useEffect(() => {
      setEditformdata({
          id: data.editVendorModal.id,
          vendorName: data.editVendorModal.vendorName,
          email: data.editVendorModal.email,
          address: data.editVendorModal.address,
          status: data.editVendorModal.status,
          gstNo: data.editVendorModal.gstNo,
          mobileNo: data.editVendorModal.mobileNo,
          alternateMobileNo: data.editVendorModal.alternateMobileNo,
          comments: data.editVendorModal.comments,
        });
    }, [data.editVendorModal]);
    
    const fetchVendorData = async () => {
      let responseData = await getAllVendor();
      if (responseData) {
        setVendors(responseData);
      }
    };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      let responseData = await editVendor(editformData);
      if (responseData.success) {
        fetchVendorData();
        setEditformdata({ ...editformData, success: responseData.success });
        setTimeout(() => {
          return setEditformdata({
            ...editformData,
            success: responseData.success,
          });
        }, 2000);
      } else if (responseData.error) {
        setEditformdata({ ...editformData, error: responseData.error });
        setTimeout(() => {
          return setEditformdata({
            ...editformData,
            error: responseData.error,
          });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) =>
          dispatch({ type: "editVendorModalClose", payload: false })
        }
        className={`${
          data.editVendorModal.modal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.editVendorModal.modal ? "" : "hidden"
        } fixed inset-0 flex items-center z-30 justify-center overflow-auto`}
      >
        <div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Edit Vendor
            </span>
            {/* Close Modal */}
            <span
              style={{ background: "#303031" }}
              onClick={(e) =>
                dispatch({ type: "editVendorModalClose", payload: false })
              }
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          {editformData.error ? alert(editformData.error, "red") : ""}
          {editformData.success ? alert(editformData.success, "green") : ""}
          <form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="vendorName">Vendor Name *</label>
                <input
                  value={editformData.vendorName}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      vendorName: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="email">Email *</label>
                <input
                  value={editformData.email}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      email: e.target.value,
                    })
                  }
                  type="email"
                  className="px-4 py-2 border focus:outline-none"
                  id="price"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="address">Address *</label>
              <textarea
                value={editformData.address}
                onChange={(e) =>
                    setEditformdata({
                    ...editformData,
                    error: false,
                    success: false,
                    address: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none"
                name="description" jr
                id="description"
                cols={5}
                rows={2}
              />
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Status *</label>
                <select
                  value={editformData.status}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      status: e.target.value,
                    })
                  }
                  name="status"
                  className="px-4 py-2 border focus:outline-none"
                  id="status"
                >
                  <option name="status" value="Active">
                    Active
                  </option>
                  <option name="status" value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="gstNo">GstNo *</label>
                <input
                  value={editformData.gstNo}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      gstNo: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  name="description" jr
                  id="description"
                  cols={5}
                  rows={2}
                />
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="mobileNo">MobileNo *</label>
                <input
                  value={editformData.mobileNo}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      mobileNo: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="quantity"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="comments">Comments *</label>
                <textarea
                  value={editformData.comments}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      comments: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="offer"
                />
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="alternateMobileNo">AlternateMobileNo *</label>
                <input
                  value={editformData.alternateMobileNo}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      alternateMobileNo: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="quantity"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <button
                style={{ background: "#303031" }}
                type="submit"
                className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
              >
                Create vendor
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditVendorModal;
