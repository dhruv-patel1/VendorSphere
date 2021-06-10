import React from "react";
import {database} from "../firebase/firebase";
import { connect } from "react-redux";
import {storage} from "../firebase/firebase";

import {startLogout} from "../actions/auth";

import MuiPhoneNumber from "material-ui-phone-number";
import AddressInput from "../components/subcomponents/AddressInput";

import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FormControlLabel } from "@material-ui/core";

class BusinessProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            anchorEl: null,
            anchorEl2: null,
            category: "",
            phone: "",
            address: "",
            img: null,
            fileName: "",
            picUploaded: false,
            description: "",
            url: "",
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
            checkbox5: false,
            checkbox6: false,
            checkbox7: false,
            mondayOpen: undefined,
            mondayClose: undefined,
            tuesdayOpen: undefined,
            tuesdayClose: undefined,
            wednesdayOpen: undefined,
            wednesdayClose: undefined,
            thursdayOpen: undefined,
            thursdayClose: undefined,
            fridayOpen: undefined,
            fridayClose: undefined,
            saturdayOpen: undefined,
            saturdayClose: undefined,
            sundayOpen: undefined,
            sundayClose: undefined,
            error: "",
            editMode: false
        };
    }

    componentDidMount(){
        const path = this.props.location.pathname;
        if(path === "/edit-profile"){
            this.setState({
                editMode: true
            });
        }
        
    }

    handleLogout = () =>{
        this.props.startLogout();
    }

    handleCategoryClick = (e) =>{
        this.setState({anchorEl: e.currentTarget});
    }

    handleCategoryClose = (e) =>{
        this.setState({anchorEl: null});
        const { myValue } = e.currentTarget.dataset;
        this.setState({category: myValue});
    }

    handleAddressClick = (e) =>{
        this.setState({anchorEl2: e.currentTarget});
    }

    handleAddressClose = () =>{
        this.setState({anchorEl2: null});
    }

    handlePhoneChange = (value) =>{
        if(value){
            this.setState({phone: value});
        }
    }

    handleAddress = (street, city, state, zip) =>{
        if(street && city && state && zip){
            const addressVal = street.concat(`, ${city}`, `, ${state}`, `, ${zip}`);
            this.setState({address: addressVal});
        }
        
    }

    handleUploadChange = (e) =>{
        this.setState({
            img: e.target.files[0],
            fileName: e.target.files[0].name,
            picUploaded: true
        });
    }

    handleDescriptionChange = (e) =>{
        this.setState({description: e.target.value});

    }

    handleCheckBox = (e) =>{

        switch(e.target.name){
            case("checkbox1"):
                this.setState({checkbox1: !this.state.checkbox1});
                break;
            case("checkbox2"):
                this.setState({checkbox2: !this.state.checkbox2});
                break;
             case("checkbox3"):
                this.setState({checkbox3: !this.state.checkbox3});
                break;
            case("checkbox4"):
                this.setState({checkbox4: !this.state.checkbox4});
                break;
            case("checkbox5"):
                this.setState({checkbox5: !this.state.checkbox5});
                break;
            case("checkbox6"):
                this.setState({checkbox6: !this.state.checkbox6});
                break;
            case("checkbox7"):
                this.setState({checkbox7: !this.state.checkbox7});
                break;
            default:
                break;
        }

    }

    handleTimeChange = (e) =>{
       this.setState({
            [e.target.name]: e.target.value
        }); 
    }


    imgHandler = (img, fileName) =>{
        return new Promise((resolve) => {
            const id = this.props.uid;
            const upload = storage.ref(`images/${id}/profile/${fileName}`).put(img);
        
            upload.on('state_changed', (snapshot) =>{
                console.log("Image has been added: ", snapshot);
            },
            err =>{
                console.log(err);
            },
            () =>{
                 storage.ref(`images/${id}/profile/${fileName}`)
                .getDownloadURL()
                .then(url =>{
                    this.setState({url});
                    console.log('after img upload', this.state.url);
                    resolve();
                });
            });
        });
    };

    createProfile = async (url, category, phone, address, description, openHours, closeHours) =>{
        //I get the id
        const id = this.props.uid;

        console.log(this.state.url);
        const business_profile = {category, phone, address, description, openHours, closeHours, url};
    
        return await database.ref(`users/business/${id}/business_info`).set(business_profile)
        .then(() =>{
            console.log("Business Profile Successfully created");
            //update profileComplete value
            return database.ref(`users/business/${id}/profile_info`).update({
                "profileComplete": true
            })
            .then(() =>{
                console.log("Profile is complete!");
                this.props.history.push("/profile");
            })
            .catch((err) =>{
                console.log(err);
            })
        })
        .catch((err) =>{
            console.log(err);
        }) 
    
    }

    handleProfileSubmit = async (e) =>{
        e.preventDefault();
        const openHours = {};
        const closeHours = {};
        let error = "";

        let {mondayOpen, mondayClose, tuesdayOpen, tuesdayClose, wednesdayOpen, wednesdayClose, thursdayOpen, thursdayClose, fridayOpen, fridayClose, saturdayOpen, saturdayClose, sundayOpen, sundayClose} = this.state;
        if(mondayOpen === undefined && mondayClose === undefined){
            mondayOpen = "0:00";
            mondayClose = "0:00";
            openHours["1"] = mondayOpen;
            closeHours["1"] = mondayClose;
        }
        else{
            openHours["1"] = mondayOpen;
            closeHours["1"] = mondayClose;
        }

        if(tuesdayOpen === undefined && tuesdayClose === undefined){
            tuesdayOpen= "0:00";
            tuesdayClose = "0:00";
            openHours["2"] = tuesdayOpen;
            closeHours["2"] = tuesdayClose;
        }
        else{
            openHours["2"] = tuesdayOpen;
            closeHours["2"] = tuesdayClose;
        }

        if(wednesdayOpen === undefined && wednesdayClose === undefined){
            wednesdayOpen= "0:00";
            wednesdayClose = "0:00";
            openHours["3"] = wednesdayOpen;
            closeHours["3"] = wednesdayClose;
        }
        else{
            openHours["3"] = wednesdayOpen;
            closeHours["3"] = wednesdayClose;
        }

        if(thursdayOpen === undefined && thursdayClose === undefined){
            thursdayOpen= "0:00";
            thursdayClose = "0:00";
            openHours["4"] = thursdayOpen;
            closeHours["4"] = thursdayClose;
        }
        else{
            openHours["4"] = thursdayOpen;
            closeHours["4"] = thursdayClose;
        }

        if(fridayOpen === undefined && fridayClose === undefined){
            fridayOpen= "0:00";
            fridayClose = "0:00";
            openHours["5"] = fridayOpen;
            closeHours["5"] = fridayClose;
        }
        else{
            openHours["5"] = fridayOpen;
            closeHours["5"] = fridayClose;
        }
        if(saturdayOpen === undefined && saturdayClose === undefined){
            saturdayOpen= "0:00";
            saturdayClose = "0:00";
            openHours["6"] = saturdayOpen;
            closeHours["6"] = saturdayClose;
        }
        else{
            openHours["6"] = saturdayOpen;
            closeHours["6"] = saturdayClose;
        }

        if(sundayOpen === undefined && sundayClose === undefined){
            sundayOpen= "0:00";
            sundayClose = "0:00";
            openHours["7"] = sundayOpen;
            closeHours["7"] = sundayClose;
        }
        else{
            openHours["7"] = sundayOpen;
            closeHours["7"] = sundayClose;
        }
        
        const {img, fileName, category, phone, address, description} = this.state;
        if(fileName && img){
            if(!img || !fileName || !category || !address || !description){
                error = "All fields are required";
                console.log("Something went wrong");
                this.setState({error});
                }
            else{
                    await this.imgHandler(img, fileName);
                    console.log(openHours, closeHours);
                    this.setState({error: ""});

                    
                    const url = this.state.url;
                    console.log(url); 
                    this.createProfile(url, category, phone, address, description, openHours, closeHours);
                    
                    
                }
        }
 
    }


    render(){
        return(
            <div className="create-profile-page">

                {this.state.editMode ? (<div>
                    This is the edit business profile page
                </div>)
                :
                (
                    <div>
                This is the create business profile page
                <button onClick={this.handleLogout}>Sign Out</button>
            </div>)
                }

                

                <form onSubmit={this.handleProfileSubmit}>
                    <div className="form-item1">
                        <Button aria-controls="simple-menu" required aria-haspopup="true" onClick={this.handleCategoryClick}>
                            {this.state.category === "" ? <p>Type of Store</p> : this.state.category}
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Antiques"}>Antiques</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Appliances"}>Appliances</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Arts/Crafts"}>Arts/Crafts</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Auto Parts"}>Auto Parts</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Accessories"}>Accessories</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Beauty"}>Beauty</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Bikes"}>Bikes</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Books"}>Books</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Camping"}>Camping</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Children"}>Children</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Cell Phones"}>Cell Phones</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Clothes"}>Clothes</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Collectibles"}>Collectibles</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Computers"}>Computers</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Electronics"}>Electronics</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Furniture"}>Furniture</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Gardening"}>Gardening</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Household"}>Household</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Jewelry"}>Jewelry</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Motorsports"}>Motorsports</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Music"}>Music</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Photo/Video"}>Photo/Video</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Sporting"}>Sporting</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Tools/Equipment"}>Tools/Equipment</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Toys"}>Toys</MenuItem>
                            <MenuItem onClick={this.handleCategoryClose} data-my-value={"Video Games"}>Video Games</MenuItem>
                        </Menu>
                    </div>
                    
                    <div className="form-item2">
                        <img src={""} alt="" className="create-profile-icon"/>
                        <MuiPhoneNumber
                            name="phone"
                            label="Phone Number"
                            data-cy="user-phone"
                            defaultCountry={"us"}
                            value={this.state.phone}
                            onChange={this.handlePhoneChange}
                        />
                    </div>

                    <div className="form-item3">
                        <Button aria-controls="simple-menu" required aria-haspopup="true" onClick={this.handleAddressClick}>
                            {this.state.address === "" ? <p>Add an address</p> : this.state.address}
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl2}
                            keepMounted
                            open={Boolean(this.state.anchorEl2)}
                            onClose={this.handleAddressClose}
                        >
                            <MenuItem data-my-value={""}>
                                <AddressInput handleAddressClose={this.handleAddressClose} handleAddress={this.handleAddress}/>
                            </MenuItem>
                        </Menu>
                    </div>
                    
                    <div className="form-item4">
                        
                        <input
                            accept="image/*"
                            className="upload-input"
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={this.handleUploadChange}
                        />
                        
                        {this.state.picUploaded && <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>}
                    </div>



                    <div className="form-item5">
                        <TextField style={{marginBottom: 5}} name="description" multiline={true} required type={"text"} label={"Store Description"} onChange={this.handleDescriptionChange} className="description-input" inputProps={{ maxLength: 150 }}/>
                    </div>

                    <div className="form-item6">

                        <div className="monday">
                            <TextField id="time" style={{width: 200, marginBottom: 10, marginTop: 10}} disabled={this.state.checkbox1} name="mondayOpen" label="Monday Open" type="time" defaultValue="12:00" className="time-input" onChange={this.handleTimeChange}/>
                            <TextField id="time" style={{width: 200, marginBottom: 10, marginTop: 10}} disabled={this.state.checkbox1} name="mondayClose" label="Monday Close" type="time" defaultValue="12:00" className="time-input" onChange={this.handleTimeChange}/>
                            <div className="closed-checkbox">
                                <FormControlLabel
                                    control={
                                    <Checkbox name="checkbox1" checked={this.state.checkbox1} onChange={this.handleCheckBox}/>
                                    }
                                    label="Closed"
                                />
                            </div>
                        </div>

                        <div className="tuesday">
                            <TextField id="time" style={{width: 200, marginBottom: 10}} disabled={this.state.checkbox2} name="tuesdayOpen" label="Tuesday Open" type="time" defaultValue="12:00" className="time-input" onChange={this.handleTimeChange}/>
                            <TextField id="time" style={{width: 200, marginBottom: 10}} disabled={this.state.checkbox2} name="tuesdayClose" label="Tuesday Close" type="time" defaultValue="12:00" className="time-input" onChange={this.handleTimeChange}/>
                            <div className="closed-checkbox">
                                <FormControlLabel
                                    control={
                                    <Checkbox name="checkbox2" checked={this.state.checkbox2} onChange={this.handleCheckBox}/>
                                    }
                                    label="Closed"
                                />
                            </div>
                        </div>

                        <div className="wednesday">
                            <TextField id="time" style={{width: 200, marginBottom: 10}} disabled={this.state.checkbox3} name="wednesdayOpen" label="Wednesday Open" type="time" defaultValue="12:00" className="time-input" onChange={this.handleTimeChange}/>
                            <TextField id="time" style={{width: 200, marginBottom: 10}} disabled={this.state.checkbox3} name="wednesdayClose" label="Wednesday Close" type="time" defaultValue="12:00" className="time-input" onChange={this.handleTimeChange}/>
                            <div className="closed-checkbox">
                                <FormControlLabel
                                    control={
                                    <Checkbox name="checkbox3" checked={this.state.checkbox3} onChange={this.handleCheckBox}/>
                                    }
                                    label="Closed"
                                />
                            </div>
                        </div>

                        <div className="thursday">
                            <TextField id="time" style={{width: 200, marginBottom: 10}} disabled={this.state.checkbox4} name="thursdayOpen" label="Thursday Open" type="time" defaultValue="12:00" className="time-input" onChange={this.handleTimeChange}/>
                            <TextField id="time" style={{width: 200, marginBottom: 10}} disabled={this.state.checkbox4} name="thursdayClose" label="Thursday Close" type="time" defaultValue="12:00" className="time-input" onChange={this.handleTimeChange}/>
                            <div className="closed-checkbox">
                                <FormControlLabel
                                    control={
                                    <Checkbox name="checkbox4" checked={this.state.checkbox4} onChange={this.handleCheckBox}/>
                                    }
                                    label="Closed"
                                />
                            </div>
                        </div>

                        <div className="friday">
                            <TextField id="time" style={{width: 200, marginBottom: 10}} disabled={this.state.checkbox5} name="fridayOpen" label="Friday Open" type="time" defaultValue="12:00" className="time-input" onChange={this.handleTimeChange}/>
                            <TextField id="time" style={{width: 200, marginBottom: 10}} disabled={this.state.checkbox5} name="fridayClose" label="Friday Close" type="time" defaultValue="12:00" className="time-input" onChange={this.handleTimeChange}/>
                            <div className="closed-checkbox">
                                <FormControlLabel
                                    control={
                                    <Checkbox name="checkbox5" checked={this.state.checkbox5} onChange={this.handleCheckBox}/>
                                    }
                                    label="Closed"
                                />
                            </div>
                        </div>

                        <div className="saturday">
                            <TextField id="time" style={{width: 200, marginBottom: 10}} disabled={this.state.checkbox6} name="saturdayOpen" label="Saturday Open" type="time" defaultValue="12:00" className="time-input" onChange={this.handleTimeChange}/>
                            <TextField id="time" style={{width: 200, marginBottom: 10}} disabled={this.state.checkbox6} name="saturdayClose" label="Saturday Close" type="time" defaultValue="12:00" className="time-input" onChange={this.handleTimeChange}/>
                            <div className="closed-checkbox">
                                <FormControlLabel
                                    control={
                                    <Checkbox name="checkbox6" checked={this.state.checkbox6} onChange={this.handleCheckBox}/>
                                    }
                                    label="Closed"
                                />
                            </div>
                        </div>

                        <div className="sunday">
                            <TextField id="time" style={{width: 200, marginBottom: 10}} disabled={this.state.checkbox7} name="sundayOpen" label="Sunday Open" type="time" defaultValue="12:00" className="time-input" onChange={this.handleTimeChange}/>
                            <TextField id="time" style={{width: 200, marginBottom: 10}} disabled={this.state.checkbox7} name="sundayClose" label="Sunday Close" type="time" defaultValue="12:00" className="time-input" onChange={this.handleTimeChange}/>
                            <div className="closed-checkbox">
                                <FormControlLabel
                                    control={
                                    <Checkbox name="checkbox7" checked={this.state.checkbox7} onChange={this.handleCheckBox}/>
                                    }
                                    label="Closed"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="create-profile-submit">
                        <input type="submit" value="Create Profile"/>
                    </div>
                       {this.state.error && <p>{this.state.error}</p>}
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    uid: state.auth.uid
});

const mapDispatchToProps = (dispatch) =>({
    startLogout: () => dispatch(startLogout())
});



export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);