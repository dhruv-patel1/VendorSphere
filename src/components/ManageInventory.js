import React from "react";
import ItemCardList from "./ItemCardList";
import {Link} from "react-router-dom";
import vendor_logo from "../assets/vendor-logo.svg";
import EditItem from "./subcomponents/EditItem";
import DeleteAlert from "./subcomponents/DeleteAlert";
import {connect} from "react-redux";
import { database, storage } from "../firebase/firebase";
import {startSetItems} from "../actions/items";

class ManageInventory extends React.Component{

    constructor(props){
        super(props);
        this.state={
            editWindow: false,
            id: "",
            deleteWindow: false,
            itemId: "",
            item: ""
        }
    }

    handleEdit = (id) =>{
        this.setState({
            editWindow: !this.state.editWindow,
            itemId: id
        });

        //get specific item object from state storage of items using id
        const items = this.props.items;

        for(let i=0; i<items.length; i++){
            if(items[i].id === id){
                this.setState({
                    item: items[i]
                });
            }
        }

    }

    handleEditClose = () =>{
        this.setState({
            editWindow: false
        });
    }

    openDelete = (id) =>{
        this.setState({
            deleteWindow: !this.state.deleteWindow,
            id
        });
    }

    closeDelete = () =>{
        this.setState({
            deleteWindow: false
        });
    }

    handleDelete = () =>{
        this.closeDelete();
        database.ref(`users/business/${this.props.uid}/items/${this.state.id}`).remove()
        .then(() =>{
            //add logic for deleting the image from storage
            this.removeImage();
            this.props.startSetItems();
        })
        .catch((err) =>{
            console.log(err);
        })
    }

    removeImage = () =>{
        const items = this.props.items;
        let item;

        for(let i=0; i<items.length; i++){
            if(items[i].id === this.state.id){
                item = items[i];
            }
        }
        const deleteRef =  storage.ref(`images/${this.props.uid}/inventory/${item.fileName}`);

        deleteRef.delete()
           .then(() =>{
               console.log("File deleted");
           })
           .catch((err) =>{
               console.log(err);
           })
    }
    
   

    render(){
        return(
            <div>
                <EditItem itemId={this.state.itemId} itemInfo={this.state.item} open={this.state.editWindow} close={this.handleEditClose} />
                <DeleteAlert open={this.state.deleteWindow} close={this.closeDelete} delete={this.handleDelete}/>
                <div>
                    <header className="dash-header manage-header">
                    <div className="dash-logo-contents">
                        <Link to="/profile" className="dash-logo-link" >
                            <img src={vendor_logo} alt="VendorSphere" className="dash-logo"/>
                        </Link>
                    </div>
                    </header>
                </div>

                <div className="items-filters-container">
                </div>

                <div>
                    <ItemCardList handleOpen={this.handleEdit} openDelete={this.openDelete}/>
                </div>

                
            </div>
        )
    }
};

const mapStateToProps = (state) =>({
    items: state.item,
    uid: state.auth.uid
})

const mapDispatchToProps = (dispatch) =>({
    startSetItems: () => dispatch(startSetItems())
})



export default connect(mapStateToProps, mapDispatchToProps)(ManageInventory); 