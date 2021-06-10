import React from "react";
import EditQuantity from "./subcomponents/EditQuantity";

const Item = ({id, imgUrl, itemCost, itemName, itemQuantity}) =>(
    <div className="item-div-container">
        <div className="itempic-container">
            <img src={imgUrl} alt="" className="item-pic"/>
        </div>
        <div className="itemName-container">
            <p>{itemName}</p>
        </div>
        <div className="itemInfo-container">
            <p>Item Cost: ${itemCost}</p>
            <EditQuantity id={id} itemQuantity={itemQuantity}/>
        </div>
    </div>
);

export default Item;