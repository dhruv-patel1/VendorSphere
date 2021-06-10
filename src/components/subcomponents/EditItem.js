import React from "react";
import Modal from "react-modal";
import x from "../../assets/x.svg";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import {startSetItems} from "../../actions/items";
import { connect } from "react-redux";
import {database, storage} from "../../firebase/firebase";


class EditItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            oldfileName: this.props.itemInfo.fileName,
            newfileName: "",
            imgUrl: this.props.itemInfo.imgUrl,
            img: "",
            imgChanged: false,
            itemName: this.props.itemInfo.itemName,
            itemDescription: this.props.itemInfo.itemDescription,
            itemCost: this.props.itemInfo.itemCost,
            itemQuantity: this.props.itemInfo.itemQuantity
        };
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }
    
    handleUploadChange = (e) =>{
        this.setState({
            img: e.target.files[0],
            newfileName: e.target.files[0].name,
            imgChanged: true
        });
    }

    handleImgDelete = () =>
    {
        if(this.state.imgChanged){
           const deleteRef = storage.ref(`images/${this.props.uid}/inventory/${this.props.itemInfo.fileName}`);

           deleteRef.delete()
           .then(() =>{
               console.log("File deleted");
           })
           .catch((err) =>{
               console.log(err);
           })
        }
    }

    handleNewUpload = async () =>{
        if(this.state.imgChanged){
            return new Promise((resolve) => {
                const id = this.props.uid;
                const upload = storage.ref(`images/${id}/inventory/${this.state.newfileName}`).put(this.state.img);
            
                upload.on('state_changed', (snapshot) =>{
                    console.log("Image has been added: ", snapshot);
                },
                err =>{
                    console.log(err);
                },
                () =>{
                     storage.ref(`images/${id}/inventory/${this.state.newfileName}`)
                    .getDownloadURL()
                    .then((url) =>{
                        this.setState({
                            imgUrl: url
                        });
    
                        console.log('after img upload', this.state.imgUrl);
                        resolve();
                    });
                });
            });
        }
    }


    //imgUrl problem: not getting saved to the state
    handleOnSubmit = async (e) =>{
        e.preventDefault();
        let {itemName, itemDescription, itemCost, itemQuantity, imgChanged, imgUrl, newfileName} = this.state;
        if(imgChanged){
            this.handleImgDelete();
            await this.handleNewUpload();
            imgUrl = this.state.imgUrl;
        }
        else{
            imgUrl = this.props.itemInfo.imgUrl;
        }
        //now I need to update item object in database


        let fileName = "";
        if(itemName === undefined){
            itemName = this.props.itemInfo.itemName;
        }
        if(itemDescription === undefined){
            itemDescription = this.props.itemInfo.itemDescription;
        }
        if(itemCost === undefined){
            itemCost = this.props.itemInfo.itemCost;
        }
        if(itemQuantity === undefined){
            itemQuantity = this.props.itemInfo.itemQuantity;
        }
        if(imgChanged){
            fileName = newfileName;
         }
        else{
            fileName = this.props.itemInfo.fileName;
        }


        const item = {
            fileName,
            imgUrl,
            itemCost,
            itemDescription,
            itemName,
            itemQuantity
        };

        console.log(item);
        console.log(this.state);

        //set will overwrite the data at this location in the database
        database.ref(`users/business/${this.props.uid}/items/${this.props.itemId}`).set(item)
        .then(() =>{
            this.props.startSetItems();
            console.log("Item successfully updated");
            this.props.close();
        })
        .catch((err) =>{
            console.log(err);
        })

    }
    render()
    {
        return(
            <div>
                <Modal
                isOpen={this.props.open}
                onRequestClose={this.props.close}
                contentLabel="Add-Item"
                className="addItemModal"
                ariaHideApp={false}
                >
                    <div className="addItemModal-header">
                        <div>
                            Edit-Item
                        </div>
                        <div>
                            <img src={x} alt="close" className="close-addItem-btn" onClick={this.props.close}/>
                        </div>
                    </div>

                    <div className="addItemModal-content">
                        <div className={"currentImg-container"}>
                            <img src={this.props.itemInfo.imgUrl} alt="" className="current-item-img"/>
                        </div>
                        <form className="addItem-form" onSubmit={this.handleOnSubmit}>
                            
                            <TextField style={{marginBottom: 15}} variant={"outlined"} name="itemName" type={"text"} label={"Item Name"} onChange={this.handleChange} className="" placeholder={this.props.itemInfo.itemName}/>
                            <TextField style={{marginBottom: 15}} variant={"outlined"} name="itemDescription" multiline={true} type={"text"} label={"Item Description"} onChange={this.handleChange} className="" placeholder={this.props.itemInfo.itemDescription} inputProps={{ maxLength: 120 }}/>
                            <TextField style={{marginBottom: 15}} variant={"outlined"} name="itemQuantity" type={"number"} label={"Item Quantity"} onChange={this.handleChange} className="" placeholder={this.props.itemInfo.itemQuantity}/>
                            <OutlinedInput style={{marginBottom: 15}} name="itemCost" startAdornment={<InputAdornment position="start">$</InputAdornment>} type={"number"} onChange={this.handleChange} className="" placeholder={this.props.itemInfo.itemCost}/>
                            <div className="imgChange-box">
                                <p>Change Image:</p>
                                <input
                                accept="image/*"
                                className="upload-input"
                                name="fileName"
                                multiple
                                type="file"
                                onChange={this.handleUploadChange}
                                />
                            </div>
                            <input type="submit" value="Edit Item" className="addItem-submit"/>
                        </form>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    uid: state.auth.uid
})

const mapDispatchToProps = (dispatch) =>({
    startSetItems: ()=> dispatch(startSetItems())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);