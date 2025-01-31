import React, { Fragment, createContext,  } from "react";
import AdminLayout from "../layout";
import InvoiceForm from"./InvoiceForm";

export const BillingContext = createContext();

const BillingComponent = () => {
    return (
        <Fragment>
            <AdminLayout children={<InvoiceForm />} />
        </Fragment>
    );
}



export default BillingComponent;