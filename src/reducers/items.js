
const itemsReducerDefault = []

const itemsReducer = (state = itemsReducerDefault, action) =>{
    switch(action.type){
        case "ADD_ITEM":
            return [...state, action.item];
        case "SET_ITEMS":
            return action.items;
        default:
            return state;
    }
}

export default itemsReducer;