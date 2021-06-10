import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

export const PublicRoute = ({isAuthenticated, flag, profileComplete, component: Component, ...rest}) =>{
    return <Route {...rest} component={(props) =>(
        isAuthenticated ?  (
            flag === "business" ? ( profileComplete ? <Redirect to="/profile"/> : <Redirect to="/create-profile"/>) : <Redirect to="/loggedin-dash"/>
            //<Redirect to="/profile"/>
        ) : (
            <Component {...props}/>
        )
    )}/>
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    flag: state.auth.flag,
    profileComplete: state.auth.profileComplete
});



export default connect(mapStateToProps)(PublicRoute);