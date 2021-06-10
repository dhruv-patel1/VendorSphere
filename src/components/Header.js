import React from "react";
import {Link} from "react-router-dom";
import vendor_logo from "../assets/vendor-logo.svg";

const Header = () =>(
    <header className="dash-header">
        <div className="dash-logo-contents">
            <Link to="/" className="dash-logo-link" >
                <img src={vendor_logo} alt="VendorSphere" className="dash-logo"/>
            </Link>
        </div>
        <div className="dash-links-contents">
            <Link to="/login" className="dash-login-link">
                Sign In
            </Link>
        </div>

    </header>
);

export default Header;
