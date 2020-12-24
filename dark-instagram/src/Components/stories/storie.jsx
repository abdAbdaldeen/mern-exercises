import React from 'react';
import "./style.css"
function Storie(props) {
  return (
    <div className="storie">
        <div className={props.isNew ? "ring new" : "ring old"}>
        <img className="profileImg" src={props.img} alt=""/>
        </div>
        <p className="name">{props.name}</p>
    </div>
  );
}

export default Storie;
