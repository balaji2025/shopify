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
            id: action.vendor.id,
            vendorName: action.vendor.vendorName,
            email: action.vendor.email,
            address: action.vendor.address,
            status: action.vendor.status,
            gstNo: action.vendor.gstNo,
            mobileNo: action.vendor.mobileNo,
            alternateMobileNo: action.vendor.alternateMobileNo,
            comments: action.vendor.comments,
          },
        };
      case "editVendorModalClose":
        return {
          ...state,
          editVendorModal: {
            modal: false,
            id: "",
            vendorName: "",
            email: "",
            address: "",
            status: "",
            gstNo: "",
            mobileNo: "",
            alternateMobileNo: "",
            comments: "",
          },
        };
      default:
        return state;
    }
  };
  