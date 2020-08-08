import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import MenuItem from '@material-ui/core/MenuItem';
import Select from "@material-ui/core/Select";

import { setAuthedUser } from '../actions/authedUser';

class Login extends React.Component {

    state = {
        selectedUser: ''
      };

    handleChange = event => {
        this.setState({ selectedUser: event.target.value });
    };

    handleSubmit = event => {
        event.stopPropagation();
        event.preventDefault();
        if (this.state.selectedUser) {
            this.props.setAuthedUser(this.state.selectedUser);
        }
    };

    render() {
        const { users } = this.props;

        return (
            <div className="login">
                <form 
                    className="login-form"
                    onSubmit={this.handleSubmit}>
                <div className="login-title" component="h1" variant="h5">
                    Login
                </div>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="age-simple">Select User</InputLabel>
                        <Select
                            value={this.state.selectedUser}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'user',
                            }}
                        >
                            {Object.keys(users).map(userId => (
                                <MenuItem 
                                key={userId}
                                value={userId}>{users[userId].name}</MenuItem>))
                            }
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign in
                    </Button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users
    };
}
  
function mapDispatchToProps(dispatch) {
    return {
        setAuthedUser: bindActionCreators(setAuthedUser, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);