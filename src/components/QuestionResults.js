import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

class QuestionResults extends Component {

  checkIsYourVote = (option) => {
    const { authedUser } = this.props;
    return option.votes.includes(authedUser);
  };

  showYourVote = () => {
    return (
      <div className="vote-container">
        <div className='vote-icon'>
          Your vote
        </div>
      </div>
    );
  };

  showResult = (option, totalVotes) => {
    const yourVote = this.checkIsYourVote(option);

    return (
      <div>
        {yourVote && this.showYourVote()}
        <Typography variant="subtitle1" className="question-margin">Would you rather {option.text}?</Typography>
        <LinearProgress variant={'determinate'} value={ option.votes.length / totalVotes * 100 }/>
        <Typography variant="h6" className="question-margin">{option.votes.length} out of {totalVotes} votes</Typography>
      </div>
    );
  };

  render() {
    const { question } = this.props;
    const { optionOne, optionTwo } = question;
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;

    return (
      <Fragment>
        <Typography variant="h4">Results:</Typography>
        {this.showResult(optionOne, totalVotes)}
        {this.showResult(optionTwo, totalVotes)}
      </Fragment>
    );
  }
}

QuestionResults.propTypes = {
  optionOne: PropTypes.object,
  optionTwo: PropTypes.object,
  authedUser: PropTypes.string
};


function mapStateToProps({authedUser}) {
  return {
      authedUser
  }
}

export default connect(mapStateToProps)(QuestionResults)