import React from "react";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import BusinessProfile from "../components/BusinessProfile";
import CreateBusinessProfile from "../components/CreateBusinessProfile";
import LoggedinDash from "../components/LoggedinDash";
import CustomerProfile from "../components/CustomerProfile";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import ManageInventory from "../components/ManageInventory";

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <PublicRoute exact path="/" component={Dashboard} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path ="/register" component={SignUp}/>

            <PrivateRoute path="/create-profile" component={CreateBusinessProfile}/>
            <PrivateRoute path="/loggedin-dash" component={LoggedinDash}/>

            <PrivateRoute path="/cust-profile" component={CustomerProfile}/>
            <PrivateRoute path="/profile" component={BusinessProfile}/>
            <PrivateRoute path="/manage-inventory" component={ManageInventory}/>
            <PrivateRoute path="/edit-profile" component={CreateBusinessProfile}/>
        </Switch>
    </Router>
);

export default AppRouter;