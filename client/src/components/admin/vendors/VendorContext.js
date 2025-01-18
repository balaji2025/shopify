export const vendorState = {
    vendors: null,
    addVendorModal: false,
    editVendorModal: {
      modal: false,
      id: "",
      vendorName: "",
      email: "",
      status: "",
      gstNo: "",
      mobileNo: "",
      alternateMobileNo: "",
      createdAt: "",
      updatedAt: "",
      comments: "",
    },
  };
  
  export const vendorReducer = (state, action) => {
    switch (action.type) {
      /* Get all product */
      case "fetchVendorAndChangeState":
        return {
          ...state,
          vendors: action.payload,
        };
      /* Create a product */
      case "addVendorModal":
        return {
          ...state,
          addVendorModal: action.payload,
        };
      /* Edit a product */
      case "editVendorModalOpen":
        return {
          ...state,
          addVendorModal: {
            modal: true,
            id: action.vendor.pId,
            email: action.vendor.email,
            status: action.vendor.status,
            mobileNo: action.vendor.mobileNo,
            alternateMobileNo: action.vendor.alternateMobileNo,
            comments: action.vendor.comments,
          },
        };
      case "editVendorModalOpen":
        return {
          ...state,
          editProductModal: {
            modal: false,
            id: "",
            vendorName: "",
            email: "",
            status: "",
            mobileNo: "",
            alternateMobileNo: "",
            comments: "",
          },
        };
      default:
        return state;
    }
  };
  