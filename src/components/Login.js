import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {startLogin} from "../actions/auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import vendor_logo from "../assets/vendor-logo.svg";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            pass: ""
        };
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }

    loginSubmit = (e) =>{
        e.preventDefault();
        const {email, pass} = this.state;
        if(email && pass){
            this.props.startLogin(email, pass);

        }
        
    }

    render(){
        return(
            <div className="login-page-container">

                <div className="login-page-header">
                    <Link to="/" className="dash-logo-link back-logo" >
                        <img src={vendor_logo} alt="VendorSphere" className="login-logo"/>
                    </Link>
                </div>

                <div className="login-page-contents">
                    <div className="login-box">
                        <div className="login-box-text">
                            <p>Sign In</p>
                        </div>

                        <form className="login-form" onSubmit={this.loginSubmit}>
                            <TextField style={{marginBottom: 24}} variant={"outlined"} name="email" required type={"email"} label={"Email"} onChange={this.handleChange} className="login-input"/>
                            <TextField style={{marginBottom: 24}} variant={"outlined"} name="pass" required type={"password"} label={"Password"} onChange={this.handleChange} className="login-input"/>
                            <p>{this.props.hasError}</p>
                            <Button type="submit" variant={"contained"} color={"default"} value="Sign In" className="signin-button" >Sign In</Button>
                        </form>

                        <div className="registration-link-holder">
                            <Link to="/register" className="registration-link">
                                <p>New to Vendor Sphere?</p>
                                <p>Sign up now.</p>
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>({
    startLogin: (email, pass) => dispatch(startLogin(email, pass))
})

const mapStateToProps = (state) =>{
    return{
        hasError: state.auth.error
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);