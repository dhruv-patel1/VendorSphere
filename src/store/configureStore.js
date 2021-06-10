import { createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import itemsReducer from "../reducers/items";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () =>{
    //Store creation
    const store = createStore(
        combineReducers({
            auth: authReducer,
            item: itemsReducer
    }), 
    composeEnhancers(applyMiddleware(thunk))
   );
   return store;
};
