import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ProfileMenu from './ProfileMenu';

class Nav extends Component {

  state = {
    anchorEl: null,
  };

  render(){

    const classes = this.props;
    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
      this.setState({anchorEl: event.currentTarget});
    };

    const handleClose = () => {
      this.setState({anchorEl: null});
    };

    const handleHome = () => {
      handleClose();
      this.props.history.push(`/`)
    };

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="menu"
            onClick={handleMenu}
          >
          <MenuIcon />
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
            onClose={handleClose}
          >
            <MenuItem onClick={handleHome}>Home</MenuItem>
          </Menu>
          <div  className="nav-title">
            <Typography variant="h6">
              Would you rather?
            </Typography>
          </div>
          <ProfileMenu/>
        </Toolbar>
      </AppBar> 
    )
  } 
}

export default withRouter(Nav)