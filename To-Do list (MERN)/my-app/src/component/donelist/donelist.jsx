import React from "react";

import "./style.css";

import FlipMove from "react-flip-move";

function Donelist(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    return (
      <div className="done-list" key={item._id}>
        <p className="tasktext">{item.task}</p>
        <span>
          <i
            className="fas fa-trash"
            onClick={() => {
              props.deleteItem(item._id);
            }}
          ></i>
        </span>
      </div>
    );
  });
  return (
    <div className="done-list-co">
      <h2>Done</h2>
      <FlipMove duration={300} easing="ease-in-out">
        {listItems}
      </FlipMove>
    </div>
  );
}

export default Donelist;
