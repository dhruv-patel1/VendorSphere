import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class AddressInput extends React.Component{

        state={
            street: "",
            city: "",
            state: "",
            zip: undefined
        };


    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }


    handleClose = () =>{
        this.props.handleAddressClose();
    }

    handleAddressSubmit = () =>{
        const {street, city, state, zip} = this.state;
        this.props.handleAddress(street, city, state, zip);
        this.handleClose();
    }

    render(){
        return(
            <div className="address-input-comp">
                <form>
                    <div className="address-line-one">
                        <TextField style={{marginBottom: 5}} name="street" required type={"text"} label={"Address"} onChange={this.handleChange} className="address-input"/>
                    </div>
                    <div className="address-line-two">
                        <TextField style={{marginBottom: 5}} name="city" required type={"text"} label={"City"} onChange={this.handleChange} className="address-input"/>
                    </div>
                    <div className="address-line-three">
                        <TextField style={{marginBottom: 5}} name="state" required type={"text"} label={"State/Province"} onChange={this.handleChange} className="address-input"/>
                        <TextField style={{marginBottom: 5}} name="zip" required type={"text"} label={"ZIP/Postal Code"} onChange={this.handleChange} className="address-input"/>
                    </div>
                    <div className="address-buttons">
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleAddressSubmit}>Confirm Address</Button>
                    </div>
                </form>
                

            </div>
        )
    }
}

export default AddressInput;