import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ProfileMenu from './ProfileMenu'
import { NavLink } from 'react-router-dom'

class Nav extends Component {

  render(){

    return (
      <AppBar position="static">
        <Toolbar>
          <div  className="nav-title">
            <NavLink className="nav-link" to='/' exact activeClassName='active'>
              Home
            </NavLink>
            <NavLink  className="nav-link" to='/add' exact activeClassName='active'>
              New Question
            </NavLink>
            <NavLink  className="nav-link" to='/leaderboard'>
              Leader Board
            </NavLink>
          </div>
          <ProfileMenu/>
        </Toolbar>
      </AppBar> 
    )
  } 
}

export default withRouter(Nav)