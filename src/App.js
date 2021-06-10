import React from 'react';
import AppRouter,{history} from "./router/AppRouter";
import {Provider} from "react-redux";
import firebase,{database} from "./firebase/firebase";
import configureStore from "./store/configureStore";
import {login,logout, getSetInfo} from "./actions/auth";
import {startSetItems} from "./actions/items";
import "./styles/styles.scss";

export const store = configureStore();

class App extends React.Component{
  componentDidMount(){
      firebase.auth().onAuthStateChanged((user) =>{
        if(user){
            const uid = user.uid;
            //store.dispatch(login(user.uid));

            database.ref(`users/business/${uid}/profile_info`).once("value")
            .then((snapshot) =>{

                const flag = snapshot.val().flag;
                const profileComplete = snapshot.val().profileComplete;
                const name = snapshot.val().name;
                // console.log(flag, profileComplete, name);
  
                store.dispatch(getSetInfo(name, flag, profileComplete));

                if(flag === "business"){
                    store.dispatch(login(uid));
                    if(profileComplete){
                        history.push("/profile");
                    }
                    else{
                        history.push("/create-profile");
                    }
                }
                else{
                    store.dispatch(login(uid));
                    history.push("/loggedin-dash");
                }

                store.dispatch(startSetItems());

            })
            .catch(() =>{ 
                database.ref(`users/customer/${uid}/profile_info`).once("value")
                .then((snapshot) =>{
                    console.log(snapshot.val());
                    // console.log(flag, profileComplete, name);
                    const flag = snapshot.val().flag;
                    const profileComplete = snapshot.val().profileComplete;
                    const name = snapshot.val().name;
                    store.dispatch(login(uid));
                    store.dispatch(getSetInfo(name, flag, profileComplete));
                    history.push("/loggedin-dash");


                })
            })
        }
        else{
            localStorage.removeItem("uid");
            store.dispatch(logout());
        }
      })
  }
  render(){
  return(
    <Provider store={store}>
        <AppRouter/>
    </Provider>
  )
}
};


//useEffect for authlistener function
//and authlistner function

export default App;
