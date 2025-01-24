export const vendorState = {
    vendors: null,
    addVendorModal: false,
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
      createdAt: "",
      updatedAt: "",
      comments: "",
    },
    deleteVendorModal: {
      modal: false,
      id: "",
      vendorName: "",
      email: "",
      address: "",
      status: "",
      gstNo: "",
      mobileNo: "",
      alternateMobileNo: "",
      createdAt: "",
      updatedAt: "",
      comments: "",
    }
  };
  
  export const vendorReducer = (state, action) => {
    switch (action.type) {
      /* Get all product */
      case "fetchVendorsAndChangeState":
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
          editVendorModal: {
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
            gstNo:  "",
            mobileNo: "",
            alternateMobileNo: "",
            comments: "",
          },
        };

      //delete vendor
      case "deleteVendorModalOpen":
      return{
        ...state,
        deleteVendorModal: {
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
      case "deleteVendorModalClose":
      return {
        ...state,
        deleteVendorModal: {
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
      }
      default:
      return state;
    }
  };
