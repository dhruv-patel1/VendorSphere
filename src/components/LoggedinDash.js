import React from "react"; 
import {connect} from "react-redux";
import vendor_logo from "../assets/vendor-logo.svg";
import {startLogout} from "../actions/auth";
import {Link} from "react-router-dom";

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';


const LoggedinDash = ({name, flag, profileComplete, startLogout}) =>{

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };
    
      const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false);
      };
    
      function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        }
      }
    
      // return focus to the button when we transitioned from !open -> open
      const prevOpen = React.useRef(open);
      React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
          anchorRef.current.focus();
        }
    
        prevOpen.current = open;
      }, [open]);
    
        return(
            <div>
                <div className="dash-logo-contents">
                    <div>
                        <img src={vendor_logo} alt="VendorSphere" className="dash-logo"/>
                    </div>

                    <div>
                        <Button
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        style={{textTransform: 'none'}}>
                            Welcome, {name}
                        </Button>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                            <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                            {
                                                flag === "business" ? 
                                                (profileComplete ? 
                                                    <Link to="/profile">
                                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                    </Link>
                                                    :
                                                    <Link to="/create-profile">
                                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                    </Link>
                                                    ) :
                                                (
                                                    <Link to="/cust-profile">
                                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                    </Link>
                                                )
                                            }
                                            <MenuItem onClick={startLogout} value={"logout"}>Logout</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                            )}
                        </Popper>
                    </div>
                    

                </div>
                <div>
                    This is the logged in dashboard Page that has name 
                </div>
            </div>
        )
}

const mapDispatchToProps = (dispatch) =>({
    startLogout: () => dispatch(startLogout())
})

const mapStateToProps = (state) =>({
    name: state.auth.name,
    flag: state.auth.flag,
    profileComplete: state.auth.profileComplete
});

export default connect(mapStateToProps, mapDispatchToProps)(LoggedinDash);