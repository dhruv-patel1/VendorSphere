import React from "react";
import { connect } from "react-redux";
import {database} from "../firebase/firebase";
import {startLogout} from "../actions/auth";
import {startAddItem} from "../actions/items";
import AddItemModal from "./AddItemModal";
import ItemList from "./ItemList";
import logo from "../assets/vendor-logo.svg";
import inventory from "../assets/storage.svg";
import edit from "../assets/edit.svg";
import add from "../assets/add.svg";
import {Link} from "react-router-dom";

class BusinessProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            address: "",
            openHours: [],
            closedHours: [],
            description: "",
            phone: "",
            imgUrl: "",
            items: [],
            addItem: undefined
        };
    }


    componentDidMount(){
        //Business info fetched from database
        database.ref(`users/business/${this.props.uid}/business_info`).once("value")
        .then((snapshot) =>{
            const val = snapshot.val();

            //stored display values to the state
            this.setState({
                address: val.address,
                openHours: val.openHours,
                closedHours: val.closeHours,
                description: val.description,
                phone: val.phone,
                imgUrl: val.url
            });

            //retrieve name from database
            database.ref(`users/business/${this.props.uid}/profile_info/name`).once("value")
            .then((snapshot) =>{
                const name = snapshot.val();
                this.setState({
                    name
                });
            })
            .catch((err)=>{
                console.log("There was an error fetching the business name", err);
            })
        })
        .catch((err) =>{
            console.log("There was an error fetching: ", err);
        })
    
    }



    
    handleLogout = () =>{
        this.props.startLogout();
    }

    handleAddOpen = () =>{
        this.setState({
            addItem: true
        })
    }

    handleAddClose = () =>{
        this.setState({
            addItem: undefined
        })
    }

    onSubmit = (item) =>{
        this.props.startAddItem(item);
        this.handleAddClose();
        console.log("Item has been added to inventory!");
    }
    render(){
        return(
            <div className="bprofile-page">

                <header className="business-profile-header">
                    <div className="bprofile-logo-container">
                        <img src={logo} alt="logo goes here"/>
                    </div>
                    <div className="bprofile-logout-btn">
                        <button onClick={this.handleLogout}>Sign Out</button>
                    </div> 
                </header>
                    
                <div className="profile-content-container">
                    <div className="profile-inner-container">

                        <div className="profile-inner-top-container">
                            <p className="animated-text">Welcome!</p>
                        </div>
                        
                        <div className="profile-inner-bottom-container">

                            <div className="profile-img-div">
                                <div className="profile-img-div2">
                                    <img src={this.state.imgUrl} alt="" className="profile-img"/>
                                </div>
                                <div className="bname">
                                    {this.state.name}
                                </div>
                            </div>

                            <div className="profile-info">
                                <div className="profile-info-header">
                                    <p className="profile-header-text">Profile-Info</p>
                                    <Link to="/edit-profile" className="edit-profile-link">
                                        <img src={edit} alt="edit" className="edit-profile-img" title="Edit Profile"/>
                                    </Link>
                                </div>

                                <div className="profile-info-description">
                                    <div className="profile-description-left">
                                        <div className="profile-inner-description">
                                            <div className="p-description-1">
                                                <p>Address: {this.state.address}</p>
                                            </div>
                                            <div className="p-description-2">
                                                <p>Phone: {this.state.phone}</p>
                                            </div>
                                            <div className="p-description-3">
                                                <p>{this.state.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-description-right">
                                        <div className="hours-of-op-header"> 
                                            <p className="hop-header-text">Hours of Operation</p>  
                                        </div>
                                        <div className="hours">
                                            <div className="hop">
                                                <p className="hop-text">
                                                    Monday: {this.state.openHours[1]} - {this.state.closedHours[1]}
                                                </p>
                                            </div>
                                            <div className="hop">
                                                <p className="hop-text">
                                                    Tuesday: {this.state.openHours[2]} - {this.state.closedHours[2]}
                                                </p>
                                            </div>
                                            <div className="hop">
                                                <p className="hop-text">
                                                    Wednesday: {this.state.openHours[3]} - {this.state.closedHours[3]}
                                                </p>          
                                            </div>
                                            <div className="hop">
                                                <p className="hop-text">
                                                    Thursday: {this.state.openHours[4]} - {this.state.closedHours[4]}
                                                </p>
                                            </div>
                                            <div className="hop">
                                                <p className="hop-text">
                                                    Friday: {this.state.openHours[5]} - {this.state.closedHours[5]}
                                                </p>
                                            </div>
                                            <div className="hop">
                                                <p className="hop-text">
                                                    Saturday: {this.state.openHours[6]} - {this.state.closedHours[6]}
                                                </p>
                                            </div>
                                            <div className="hop">
                                                <p className="hop-text">
                                                    Sunday: {this.state.openHours[7]} - {this.state.closedHours[7]}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                <AddItemModal open={this.state.addItem} close={this.handleAddClose} onSubmit={this.onSubmit} />
                

                <div className="pc-bottom-container">
                    <div className="bp-inventory-box">
                        <div className="inventory-box-container">
                            <div className="inventory-header">
                                <div className="inventory-header-text">
                                    <p>Inventory</p>
                                </div>
                                <div className="edit-inventory-button">
                                    <div className="bs-boxes">
                                        <img src={add} alt="add-item" title="Add Item" className="add-item-inventory" onClick={this.handleAddOpen}/>
                                    </div>
                                    <div className="bs-boxes">
                                        <Link to="/manage-inventory">
                                            <img src={inventory} alt="manage-inventory" title="Manage Inventory" className="manage-item-inventory"/>
                                        </Link>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="inventory-count-box">
                                {this.props.items.length} item(s) in current inventory
                            </div>
                            <div className="inventory-card-container">
                                    {/* This is where the ItemList component will go*/}
                                    <ItemList/>

                            </div>
                        </div>
                    </div>

                    <div className="suggestion-footer">
                    </div>
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>({
    startLogout: () => dispatch(startLogout()),
    startAddItem: (item) => dispatch(startAddItem(item))
});

const mapStateToProps = (state) =>({
    uid: state.auth.uid,
    items: state.item
});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);