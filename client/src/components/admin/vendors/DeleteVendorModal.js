import React, { Fragment, useContext, useState, useEffect } from "react";
import { VendorContext } from "./index";
import { deleteVendorById, getAllVendor } from "./FetchApi";

const DeleteVendorModal = (props) => {
  const { data, dispatch } = useContext(VendorContext);

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [deleteformData, setDeleteformData] = useState({
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

  const fetchVendorData = async () => {
    let responseData = await getAllVendor();
    if (responseData) {
      dispatch({
        type: "fetchVendorsAndChangeState",
        payload: responseData,
      });
    }
  };

  useEffect(() => {
    fetchVendorData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDeleteformData({
      id: data.deleteVendorModal.id,
      vendorName: data.deleteVendorModal.vendorName,
      email: data.deleteVendorModal.email,
      address: data.deleteVendorModal.address,
      status: data.deleteVendorModal.status,
      gstNo: data.deleteVendorModal.gstNo,
      mobileNo: data.deleteVendorModal.mobileNo,
      alternateMobileNo: data.deleteVendorModal.alternateMobileNo,
      comments: data.deleteVendorModal.comments,
    });
  }, [data.deleteVendorModal]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      let responseData = await deleteVendorById(deleteformData);
      if (responseData.success) {
        fetchVendorData();
        setDeleteformData({ ...deleteformData, success: responseData.success });
        setTimeout(() => {
          return setDeleteformData({
            ...deleteformData,
            success: responseData.success,
          });
        }, 2000);
      } else if (responseData.error) {
        setDeleteformData({ ...deleteformData, error: responseData.error });
        setTimeout(() => {
          return setDeleteformData({
            ...deleteformData,
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
          dispatch({ type: "deleteVendorModalClose", payload: false })
        }
        className={`${
          data.deleteVendorModal.modal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.deleteVendorModal.modal ? "" : "hidden"
        } fixed inset-0 flex items-center z-30 justify-center overflow-auto`}
      >
        <div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Delete vendor
            </span>
            {/* Close Modal */}
            <span
              style={{ background: "#303031" }}
              onClick={(e) =>
                dispatch({ type: "deleteVendorModalClose", payload: false })
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
          {deleteformData.error ? alert(deleteformData.error, "red") : ""}
          {deleteformData.success ? alert(deleteformData.success, "green") : ""}
          <form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="vendorName">Vendor Name *</label>
                <input
                  disabled="true"
                  value={deleteformData.vendorName}
                  onChange={(e) =>
                    setDeleteformData({
                      ...deleteformData,
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
                  disabled="true"
                  value={deleteformData.email}
                  onChange={(e) =>
                    setDeleteformData({
                      ...deleteformData,
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
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="comments">Comments *</label>
                <textarea
                  value={deleteformData.comments}
                  onChange={(e) =>
                    setDeleteformData({
                      ...deleteformData,
                      error: false,
                      success: false,
                      comments: e.target.value,
                    })
                  }
                  type="string"
                  className="px-4 py-2 border focus:outline-none"
                  id="offer"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Status *</label>
                <select
                  value={deleteformData.status}
                  onChange={(e) =>
                    setDeleteformData({
                      ...deleteformData,
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
            </div>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              {/* <div className="w-1/2 flex flex-col space-y-1"> */}

              <button
                style={{ background: "#303031" }}
                type="submit"
                className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
              >
                Save
              </button>
              {/* </div> */}
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default DeleteVendorModal;
