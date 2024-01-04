import React from "react";
import './Card.css';

const Card = (props) => {
    const className = `card `
    return (
        <div className="card">{props.children}</div>
    )
};

export default Card;