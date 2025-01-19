import React, { Fragment, createContext, useReducer } from "react";
import AdminLayout from "../layout";
import vendorTable from "./vendorTable";
import { vendorState, vendorReducer } from "./VendorContext";


/* This context manage all of the products component's data */
export const VendorContext = createContext();

const VendorComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      {/* <VendorMenu /> */}
      {/* <vendorTable /> */}
      <h1>vendors works...!</h1>
    </div>
  );
};

const Vendors = (props) => {
  /* To use useReducer make sure that reducer is the first arg */
  const [data, dispatch] = useReducer(vendorReducer, vendorState);

  return (
    <Fragment>
      <VendorContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<VendorComponent />} />
      </VendorContext.Provider>
    </Fragment>
    
  );
};

export default Vendors;
