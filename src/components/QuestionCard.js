import React from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import {Button} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";

class Question extends React.Component {

    handleViewPoll = () => {
        this.props.history.push(`/question/${this.props.id}`)
    };

    render() {
        const { author, text } = this.props;
        const title = `${author.name} asks:`;

        return (
            <Card>
                <CardHeader title={title}/>
                <div className="question-body">
                    <Avatar className="question-avatar" aria-label="Avatar" src={author.avatarURL}></Avatar>
                    <CardContent className="question-content">
                        <Typography component="p" className="question-margin">
                            <b>Would you rather</b>
                        </Typography>
                        <Typography component="p" className="question-margin">
                            ...{text}...
                        </Typography>
                        <CardActions>
                            <Button variant="contained" onClick={this.handleViewPoll} color='primary' className="question-button">
                                View poll
                            </Button>
                        </CardActions>
                    </CardContent>
                </div>
            </Card>
        );
    }
}


function mapStateToProps({authedUser, users, questions}, { id }) {
    const question = questions[id];
    return {
        authedUser,
        question,
        author: users[question.author],
        text: question.optionOne.text
    }
}

export default connect(mapStateToProps)(withRouter(Question))