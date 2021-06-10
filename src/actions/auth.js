import firebase, {database} from "../firebase/firebase";
import {store} from "../App";

export const login = (uid) => ({
    type: "LOGIN",
    uid: uid
});

const setError = (error) =>({
    type: "ERROR",
    error
});

const errMessage = (error) =>{
    let msg = "";
    switch(error.code){
        case "auth/too-many-requests":
            msg = "Too many reqeusts. Try again later";
            break;
        case "auth/invalid-email":
            msg = "Invalid email address";
            break;
        case "auth/user-disabled":
            msg = "User has been disabled";
            break;
        case "auth/user-not-found":
            msg = "Can't find an account with this email"
            break;
        case "auth/wrong-password":
            msg = "Incorrect password. Please try again"
            break;
        default:
            msg = "Incorrect email or password. Try Again"
    }
    return msg;
}

export const getSetInfo = (name, flag, profileComplete) =>({
    type: "GET_INFO",
    name,
    flag,
    profileComplete
});

export const startLogin = (email, pass) => {
    return () =>{
        return firebase.auth().signInWithEmailAndPassword(email, pass)
        .then((user)=> {
            const uid = user.user.uid;;
            console.log(uid);

        })
        .catch((err) => {
            let msg = errMessage(err);
            store.dispatch(setError(msg));
        })
    };
};

export const logout = () => ({
    type: "LOGOUT"
});

export const startLogout = () =>{
    return () =>{
        return firebase.auth().signOut() 
    }
}

export const setBasicInfo = (name, flag, profileComplete) => ({
    type: "SIGNUP",
    name,
    flag,
    profileComplete
});


const setSignupError = (signupIssue) =>({
    type: "SIGNUP_ERROR",
    signupError: signupIssue
});


//for some reason its not dispatching to the reducer gotta figure it out
export const startSignUp = (email, pass, name, flag, profileComplete) =>{
    let signUpIssue = "";
    if(flag === "customer"){
        profileComplete = true;
    }

    return () =>{
        
        return firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then((user) => {
            console.log(user);
            console.log(name, flag, profileComplete);
            const uid = user.user.uid;

            store.dispatch(login(uid));
            store.dispatch(setBasicInfo(name, flag, profileComplete));


            const profile = {email, pass, name, flag, profileComplete};

            let temp = flag;
            console.log(temp);
            return database.ref(`users/${flag}/${uid}/profile_info`).set(profile)
            .then(() =>{
                console.log("Data has been inputted");
                
            })
            .catch(err => {
                console.log(err);
            })
            
        })
        .catch((err) =>{
            console.log(err);
             signUpIssue = err.message;
             store.dispatch(setSignupError(signUpIssue));
        });
    }
}


