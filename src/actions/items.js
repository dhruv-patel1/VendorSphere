import {database} from "../firebase/firebase";

export const addItem = (item) => ({
    type: "ADD_ITEM",
    item
});

export const startAddItem = (itemData = {}) =>{
    return (dispatch, getState) =>{
        const uid = getState().auth.uid;
        const {
            fileName = "",
            imgUrl = "",
            itemName = "",
            itemDescription = "",
            itemCost = 0,
            itemQuantity = 0
        } = itemData;
        
        const item = {fileName, imgUrl, itemName, itemDescription, itemCost, itemQuantity};
        return database.ref(`users/business/${uid}/items`).push(item).then((ref) =>{
            dispatch(addItem({
                id: ref.key,
                ...item
            }));
        });
    };
}


export const setItems = (items) => ({
    type: "SET_ITEMS",
    items
});

export const startSetItems = () =>{
    return (dispatch, getState) =>{
        const uid = getState().auth.uid;
        return database.ref(`users/business/${uid}/items`).once("value").then((snapshot) =>{
            const items = [];
            snapshot.forEach((childSnapshot) =>{
                items.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            });
            dispatch(setItems(items))
        })
        
    }
};


