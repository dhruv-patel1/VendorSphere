import React from "react";
import {Link, withRouter} from "react-router-dom";
import {startSignUp} from "../actions/auth";
import {connect} from "react-redux";
import {store} from "../App";
import {setBasicInfo} from "../actions/auth";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import vendor_logo from "../assets/vendor-logo.svg";
import { withStyles } from "@material-ui/core/styles";
import {blueGrey, green} from "@material-ui/core/colors";

const ColorSwitch = withStyles({
    switchBase:{
        color: blueGrey[400],
        '&$checked': {
            color: green["A200"],
        },
        '&$checked + $track':{
            backgroundColor: green["A400"],
        },
    },
    checked: {},
    track:{
        backgroundColor: blueGrey[500]
    },
})(Switch);


class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            customer: false,
            business: false,
            email: "",
            pass: "",
            passConfirm: "",
            businessName: "",
            firstName: "",
            lastName: "",
            fieldError: "",
            profileComplete: false
        };
    }

    handleSwitch = (e) =>{
        this.setState({
            [e.target.name]: e.target.checked
        });
    }


    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }

    signUpSubmit = (e) =>{
        e.preventDefault();
        let name = "";
        let flag = "";
        let err = "";
        let runFunc = false;
        const {email, pass, passConfirm, businessName, firstName, customer, business, fieldError, profileComplete} = this.state;

        if(fieldError !== ""){
            this.setState({fieldError: ""});
        }

        else if(!customer & !business){
            err = "Select one of the toggles";
            this.setState({fieldError: err});
        }
        else if(email && pass && passConfirm){
            if(pass === passConfirm){
                if((customer && firstName !== "" )|| (business && businessName !== "")){
                    if(business){
                        flag += "business";
                        name = businessName;
                        runFunc = true;
                    }
                    else{
                        flag += "customer";
                        name = firstName;
                        runFunc = true;
                        this.setState({profileComplete: true});
                    }
                } 
            }
            else{
                err = "Passwords don't match";
                this.setState({fieldError: err});
            }
        }
        if(runFunc){
            console.log(flag);
            console.log(profileComplete);

            this.props.startSignUp(email, pass, name, flag, profileComplete);
                store.dispatch(setBasicInfo(name, flag, profileComplete));
               if(flag === "business"){
                   this.props.history.push("/create-profile");
               }
               else if(flag === "customer"){
                   this.props.history.push("/loggedin-dash");
               }
        }
    }

    render(){
        return(
            <div className="signup-page-container">
            
                <div className="signup-page-logo">
                    <Link to="/" className="back-signup-logo" >
                        <img src={vendor_logo} alt="VendorSphere" className="login-logo"/>
                    </Link>
                </div>

                <div className="toggles-holder">
                    <FormGroup row>
                        <FormControlLabel
                            control={<ColorSwitch size="small" checked={this.state.customer} disabled={this.state.business} onChange={this.handleSwitch} name="customer"/>}
                            label="Customer" 
                        />
                        <FormControlLabel
                            control={<ColorSwitch size="small" checked={this.state.business} disabled={this.state.customer} onChange={this.handleSwitch} name="business" color="primary"/>}
                            label="Business" 
                        />
                    </FormGroup>
                </div>

                <form className="signup-form" onSubmit={this.signUpSubmit}>
                    <div className="signup-item">
                        <img src={""} alt="" className="signup-icon"/>
                        <TextField style={{marginBottom: 24}} variant={"outlined"} name="email" required type={"email"} label={"Email"} onChange={this.handleChange} className="signup-input"/>
                    </div>

                    <div className="signup-item">
                        <img src={""} alt="" className="signup-icon"/>
                        <TextField style={{marginBottom: 24}} name="pass" variant={"outlined"} required type={"password"} label={"Password"} onChange={this.handleChange} className="signup-input"/>
                    </div>

                    <div className="signup-item">
                        <img src={""} alt="" className="signup-icon"/>
                        <TextField style={{marginBottom: 24}} name="passConfirm" variant={"outlined"} required type={"password"} label={"Confirm Password"} onChange={this.handleChange} className="signup-input"/>
                    </div>

                    {this.state.customer && 
                        (
                        <div>
                            <div className="signup-item">
                                <img src={""} alt="" className="signup-icon"/>
                                <TextField style={{marginBottom: 24}} name="firstName" variant={"outlined"} required type={"text"} label={"First Name"} onChange={this.handleChange} className="signup-input"/>
                            </div>
                            <div className="signup-item">
                                <img src={""} alt="" className="signup-icon"/>
                                <TextField style={{marginBottom: 24}} name="lastName" variant={"outlined"} required type={"text"} label={"Last Name"} onChange={this.handleChange} className="signup-input"/>
                            </div>
                        </div>
                        )
                    }
                    {this.state.business && 
                        (
                            <div>
                                <div className="signup-item">
                                    <img src={""} alt="" className="signup-icon"/>
                                    <TextField style={{marginBottom: 24}} name="businessName" variant={"outlined"} required type={"text"} label={"Business Name"} onChange={this.handleChange} className="signup-input"/>
                                </div>
                            </div>
                        )
                    }

                    <div className="submit-item">
                        <Button type="submit" variant={"contained"} color={"default"} value="Sign Up" className="signup-button">Sign Up</Button>
                    </div>
                    {!!this.props.error ? <p>{this.props.error}</p> : <p>{this.state.fieldError}</p>}
                </form>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>({
    startSignUp: (email, pass, name, flag, profileComplete) => dispatch(startSignUp(email, pass, name, flag, profileComplete))
})

const mapStateToProps = (state) =>{
    return{
        error: state.auth.signupError,
        flag: state.auth.flag
    };
};

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(SignUp));