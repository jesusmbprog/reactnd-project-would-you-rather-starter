import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import AccountCircle from '@material-ui/icons/AccountCircle';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as React from "react";

import { setAuthedUser } from '../actions/authedUser';

class ProfileMenu extends React.Component {

    state = {
        anchorEl: null,
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleLogout = () => {
        this.props.setAuthedUser(null);
    };

    render() {
        const { user } = this.props;
        const userName = user.name;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <span> { userName } </span>
                <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }
}

function mapStateToProps({users, authedUser}) {
    return {
        user: users[authedUser]
    }
}
  
function mapDispatchToProps(dispatch) {
    return {
      setAuthedUser: bindActionCreators(setAuthedUser, dispatch)
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);

