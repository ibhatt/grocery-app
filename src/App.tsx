import React, { useRef, useState } from "react";
import logo from "./logo.svg";
// import './App.css';
import GroceryList from "./Components/grocery-list";
import "bootstrap/dist/css/bootstrap.min.css";
import Popup from "./Components/popup";
import {
  Card,
  CardBody,
  Collapse,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import Items from "./Interface/item";
import { setSyntheticLeadingComments } from "typescript";

const groceries = [
  {
    id: "6abce9cc-c638-4e8a-b683-03e6b01fbac9",
    name: "ice cream",
  },
  {
    id: "3833fadc-82f5-4809-90d0-cd8feac67369",
    name: "frozen pizza",
  },
  {
    id: "943d17ea-b1f3-4c9d-81a5-7f528d4c9b5f",
    name: "bread",
  },
];

const App = () => {
  const [popUpStatus, setPopUpStatus] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const handleChange = (event: any) => {
    setInputVal(event.target.value);
  };
  const [editItem, setEditItem] = useState<Items>({ id: "", name: "" });
  const [groceryItems, setGroceryItems] = useState([...groceries]);
  const [isEdit, setIsEdit] = useState(false);
  const addItem = (event: any) => {
    if (isEdit) {
      const updatedItems = groceryItems.map((i: Items) => {
        i.name = i.id === editItem.id ? inputVal : i.name;
        return i;
      });
      setGroceryItems(updatedItems);
    } else {
      setGroceryItems([
        ...groceryItems,
        {
          name: inputVal,
          id: uuidv4(),
        },
      ]);
    }
    setPopUpStatus((popUpStatus) => !popUpStatus);
    setIsEdit(false);
    setInputVal("");
  };
  const triggerAction = (data: any, item: Items) => {
    if (data === "remove") {
      console.log(groceries.filter((i: Items) => i.id !== item.id));
      setGroceryItems(groceries.filter((i: Items) => i.id !== item.id));
    }
    if (data === "edit") {
      setPopUpStatus(true);
      setInputVal(item.name);
      setIsEdit(true);
      setEditItem({
        ...item,
      });
    }
  };

  return (
    <div className="jumbotron jumbotron-fluid mt-3">
      <div className="mx-3">
        <button
          className="btn btn-sm btn-info"
          onClick={() => setPopUpStatus((popUpStatus) => !popUpStatus)}
        >
          Add New Item
        </button>
        {popUpStatus ? (
          <div className="input-group input-group-sm my-3">
            <input
              type="text"
              onChange={handleChange}
              className="form-control"
              placeholder="Name"
              value={inputVal}
            />

            <div className="input-group-append">
              <button className="btn btn-success btn-sm" onClick={addItem}>
                {isEdit ? "Edit" : "Add"}
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <GroceryList items={groceryItems} triggerAction={triggerAction} />
    </div>
  );
};

export default App;
