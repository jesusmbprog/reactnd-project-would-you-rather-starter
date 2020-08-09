import React from "react";
import { Button } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { connect } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import { handleAnswerQuestion } from "../actions/shared";

class QuestionAnswer extends React.Component {
    state = {
        answer: null,
    };

    handleSubmit = event => {
        const { question, authedUser } = this.props;
        const { answer } = this.state;
        event.stopPropagation();
        event.preventDefault();
        this.props.dispatch(handleAnswerQuestion({ authedUser, qid: question.id, answer }))
    };

    handleChange = event => {
        this.setState({answer: event.target.value});
    };

    render() {
        const { question } = this.props;
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend" className="question-margin">Would you rather...</FormLabel>
                <RadioGroup
                    aria-label="option"
                    name="option"
                    value={this.state.answer}
                    onChange={this.handleChange}
                >
                    <FormControlLabel value="optionOne" control={<Radio/>} label={question.optionOne.text}/>
                    <FormControlLabel value="optionTwo" control={<Radio/>} label={question.optionTwo.text}/>
                </RadioGroup>

                <Button variant="contained" onClick={this.handleSubmit} color='primary' className="question-button">
                    Submit
                </Button>
            </FormControl>)
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(QuestionAnswer)