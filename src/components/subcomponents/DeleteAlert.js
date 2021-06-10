import React from "react";
import Modal from "react-modal";
import x from "../../assets/x.svg";
import Button from '@material-ui/core/Button';

const DeleteAlert = (props) =>{

    return(
        <div>
        <Modal
                isOpen={props.open}
                onRequestClose={props.close}
                contentLabel="Delete-Item"
                className="deleteItemModal"
                ariaHideApp={false}
            >
                <div className="deleteItemModal-header">
                    <div>
                        <img src={x} alt="close" className="close-addItem-btn" onClick={props.close}/>
                    </div>
                </div>
                <div>
                    <p>Are you sure?</p>
                    <Button variant="contained" onClick={props.delete}>Delete Item</Button>
                </div>
        </Modal>
        </div>
    )
}


export default DeleteAlert;