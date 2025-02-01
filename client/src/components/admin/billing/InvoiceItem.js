import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";
import { getAllProduct } from "../products/FetchApi";
import Select from "react-select";

const InvoiceItem = ({
  items,
  onItemizedItemEdit,
  currency,
  onRowDel,
  onRowAdd,
  setItemFromAutomatic
}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    let responseData = await getAllProduct();
    if (responseData && responseData.Products) {
      setProducts(responseData.Products);
      // console.log(responseData);
    }
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              onItemizedItemEdit={onItemizedItemEdit}
              onDelEvent={onRowDel}
              currency={currency}
              products={products} // ✅ Passing products list to ItemRow
              setItemFromAutomatic={setItemFromAutomatic}
            />
          ))}
        </tbody>
      </Table>
      <Button className="fw-bold btn-secondary" onClick={onRowAdd}>
        Add Item
      </Button>
    </div>
  );
};

const ItemRow = ({ item, onItemizedItemEdit, onDelEvent, currency, products, setItemFromAutomatic }) => {
  const productOptions = products.map((product) => ({
    id: product._id,
    label: product.pName,
    description: product.pDescription,
    price: product.pPrice
    // Used to auto-fill description
  }));

  // console.log("*******",productOptions.id);
  // products.map((e)=> {p

  //   console.log("productId*****", e._id);
  // })

  const handleProductChange = (selectedOption) => {
    setItemFromAutomatic({
      id: item.id,
      name: selectedOption.label,
      description: selectedOption.description,
      price: selectedOption.price,
      quantity: 1,
      productId: selectedOption.id
    })
    // onItemizedItemEdit({
    //   target: {
    //     id: item.id,
    //     productId: selectedOption.id,
    //     name: "name",
    //     value: selectedOption.label, // Set selected product name
    //   }
    // });

    // onItemizedItemEdit({
    //   target: {
    //     id: item.id,
    //     productId: selectedOption.id,
    //     name: "price",
    //     value: selectedOption.price, // Auto-fill description
    //   }
    // });

    // onItemizedItemEdit({
    //   target: {
    //     id: item.id,
    //     productId: selectedOption.id,
    //     name: "description",
    //     value: selectedOption.description, // Auto-fill description
    //   }
    // });
  };

  return (
    <tr>
      <td style={{ width: "100%" }}>
        {/* ✅ Searchable Product Dropdown */}
        <Select
          options={productOptions}
          onChange={handleProductChange}
          placeholder="Select Product"
        />

        {/* ✅ Auto-filled Description Field */}
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Item description",
            value: item.description,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: item.quantity,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "130px" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            leading: currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            precision: 2,
            textAlign: "text-end",
            value: item.price,
            id: item.id,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={() => onDelEvent(item)}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
