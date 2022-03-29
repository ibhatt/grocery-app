import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Items from "../Interface/item";

const GroceryList = (props: any) => {
  const [items, setItems] = useState(props.items);
  useEffect(() => {
    setItems(props.items);
  }, [props.items]);
  const triggerClick = (action: string, item: Items) => {
    props.triggerAction(action, item);
  };
  return (
    <div className="container">
      <ListGroup flush horizontal className="mt-3">
        {items.map((item: Items) => (
          <>
            <ListGroupItem
              key={item.id}
              className="d-flex flex-row justify-content-between"
            >
              <span className="w-50">{item.name}</span>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => triggerClick("edit", item)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => triggerClick("remove", item)}
              >
                Remove
              </button>
            </ListGroupItem>
          </>
        ))}
      </ListGroup>
    </div>
  );
};

export default GroceryList;
