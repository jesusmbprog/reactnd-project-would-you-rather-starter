import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleSaveQuestion } from "../actions/shared";

class NewQuestionForm extends React.Component {
    
    state = {
        optionOneText: '',
        optionTwoText: ''
    };

    handleChangeOptionOne = event => {
        this.setState({optionOneText: event.target.value});
    };

    handleChangeOptionTwo = event => {
        this.setState({optionTwoText: event.target.value});
    };

    handleSubmit = event => {
        const { authedUser, dispatch } = this.props;
        const { optionOneText, optionTwoText } = this.state;
        event.stopPropagation();
        event.preventDefault();
        if (optionOneText && optionTwoText) {
            dispatch(handleSaveQuestion({optionOneText, optionTwoText, author: authedUser}));
            this.props.history.push(`/`);
        }
    };

    render() {
        return (
            <div className="question-dashboard">
                <div className="new-question-title">Create New Question</div>
                <p>Complete the question:</p>
                <h2>Would you rather...</h2>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <FormControl margin="normal" required fullWidth>
                        <TextField
                            id="optionOne"
                            label="Enter Option One Text Here"
                            value={this.state.optionOneText}
                            onChange={this.handleChangeOptionOne}
                            margin="normal"
                        />
                        <div className="new-question-divider question-margin">OR</div>
                        <TextField
                            id="optionTwo"
                            label="Enter Option One Two Here"
                            value={this.state.optionTwoText}
                            onChange={this.handleChangeOptionTwo}
                            margin="normal"
                        />
                    </FormControl>
                    <Button variant="contained" type="submit" color='primary'>
                        Submit
                    </Button>
                </form>
            </div>)
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(withRouter(NewQuestionForm));