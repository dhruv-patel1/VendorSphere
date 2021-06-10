import React from "react";
import {connect} from "react-redux";
import Item from './Item'

const ItemList = (props) =>{
    return(
            <div className="itemlist-body">
                {
                    props.items.length === 0 ? (
                    <div>
                    </div>
                    ):
                    (
                        props.items.map((item) =>{
                            return <Item key={item.id}{...item}/>
                        })
                    )
                }
            </div>
    )
    
}

const mapStateToProps = (state) =>({
    items: state.item
});

export default connect(mapStateToProps)(ItemList);