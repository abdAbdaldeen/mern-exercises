import React from "react";
import "./style.css";

import FlipMove from "react-flip-move";

function ListItems(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    return (
      <div className="list" key={item.key}>
        <p class="tasktext" id={item._id}>
          {item.task}
        </p>
        <span>
          <i
            className="fas fa-trash"
            onClick={() => {
              props.deleteItem(item._id);
            }}
          ></i>
          <i
            class="fas fa-check-square"
            onClick={() => {
              props.setDone(item._id);
            }}
          ></i>
          <i
            class="fas fa-pen-square"
            onClick={() => {
              props.updateItem(item._id, item.task);
            }}
          ></i>
        </span>
      </div>
    );
  });
  return (
    <div className="To-Do-list">
      <h2>To-Do</h2>
      <FlipMove duration={300} easing="ease-in-out">
        {listItems}
      </FlipMove>
    </div>
  );
}

export default ListItems;
