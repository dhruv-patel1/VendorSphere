import React from "react";
import TextField from "@material-ui/core/TextField";
import {database} from "../../firebase/firebase";
import { connect } from "react-redux";
import {startSetItems} from "../../actions/items";

class EditQuantity extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            val: 0
        };
    }


    handleQuantity = () =>{
        if(this.state.val !== this.props.itemQuantity){
            database.ref(`users/business/${this.props.uid}/items/${this.props.id}/itemQuantity`).set(this.state.val)
            .then(() =>{
                console.log("Item Quantity has been updated!");
                this.props.startSetItems();
            }).catch((err) =>{
                console.log(err);
            })
        }

    }

    handleChange = (e) =>{
        this.setState({
            val: e.target.value
        });
    };

    render(){
        return(

            <div className="actual-editquant">
                <div className="Item Quantity">
                    <TextField id="quantity" style={{width: 100}} type="number"
                    InputLabelProps={{
                      shrink: true,
                    }} defaultValue={this.props.itemQuantity}  variant="outlined" label="Item Quantity" size="small" onChange={this.handleChange}/>
                    <button onClick={this.handleQuantity}>Save</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    uid: state.auth.uid
});

const mapDispatchToProps = (dispatch) =>({
    startSetItems: ()=> dispatch(startSetItems())
});
export default connect(mapStateToProps, mapDispatchToProps)(EditQuantity);