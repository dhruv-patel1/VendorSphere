import React from "react";
import Modal from "react-modal";
import x from "../assets/x.svg";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from "react-redux";
import {storage} from "../firebase/firebase";


class AddItemModal extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            fileName: "",
            imgUrl: "",
            img: "",
            itemName: "",
            itemDescription: "",
            itemCost: 0,
            itemQuantity: 0
        }
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }

    handleUploadChange = (e) =>{
        if(e.target.files[0].name !== undefined){
            this.setState({
                img: e.target.files[0],
                fileName: e.target.files[0].name
            });
        }
        
    }

    handleImgUpload = (img, fileName) =>{  
        return new Promise((resolve) => {
            const id = this.props.uid;
            const upload = storage.ref(`images/${id}/inventory/${fileName}`).put(img);
        
            upload.on('state_changed', (snapshot) =>{
                console.log("Image has been added: ", snapshot);
            },
            err =>{
                console.log(err);
            },
            () =>{
                 storage.ref(`images/${id}/inventory/${fileName}`)
                .getDownloadURL()
                .then(url =>{
                    this.setState({
                        imgUrl: url
                    });
                    console.log('after img upload', this.state.imgUrl);
                    resolve();
                });
            });
        });
    };

    handleOnSubmit = async (e) =>{
        e.preventDefault();
        //first check if fields are populated 
        //upload image and get url/store it in component state
        //then call prop function and pass item Data 
        const {fileName, img, itemName, itemDescription, itemCost, itemQuantity} = this.state;
        if(fileName && img){
            await this.handleImgUpload(img, fileName);
            console.log(this.state.imgUrl);
            if(!itemName || !itemDescription || !itemCost || !itemQuantity){
                console.log("All fields are required");   
            }
            else{
                this.props.onSubmit({
                    fileName: this.state.fileName,
                    imgUrl: this.state.imgUrl,
                    itemName: this.state.itemName,
                    itemDescription: this.state.itemDescription,
                    itemCost: this.state.itemCost,
                    itemQuantity: this.state.itemQuantity
                });
            }
        }
    }
    

    render(){
        return(
            <Modal
                isOpen={this.props.open}
                onRequestClose={this.props.close}
                contentLabel="Add-Item"
                className="addItemModal"
                ariaHideApp={false}
            >
                <div className="modal-inner">
                    <div className="addItemModal-header">
                        <div>
                            Add-Item to Inventory
                        </div>
                        <div>
                            <img src={x} alt="close" className="close-addItem-btn" onClick={this.props.close}/>
                        </div>
                    </div>

                    <div className="addItemModal-content">
                        <form className="addItem-form" onSubmit={this.handleOnSubmit}>
                            <TextField style={{marginBottom: 15}} variant={"outlined"} name="itemName" required type={"text"} label={"Item Name"} onChange={this.handleChange} className=""/>
                            <TextField style={{marginBottom: 15}} variant={"outlined"} name="itemDescription" multiline={true} required type={"text"} label={"Item Description"} onChange={this.handleChange} className="" inputProps={{ maxLength: 120 }}/>
                            <TextField style={{marginBottom: 15}} variant={"outlined"} name="itemQuantity" required type={"number"} label={"Item Quantity"} onChange={this.handleChange} className=""/>
                            <OutlinedInput style={{marginBottom: 15}} name="itemCost" startAdornment={<InputAdornment position="start">$</InputAdornment>} required type={"number"} onChange={this.handleChange} className=""/>
                            <input
                            accept="image/*"
                            className="upload-input"
                            name="fileName"
                            multiple
                            type="file"
                            onChange={this.handleUploadChange}
                            required
                            />
                            <input type="submit" value="Add Item" className="addItem-submit"/>
                        </form>
                    </div>
                </div>
            </Modal>
        )
    }
}


const mapStateToProps = (state) =>({
    uid: state.auth.uid
});



export default connect(mapStateToProps)(AddItemModal);