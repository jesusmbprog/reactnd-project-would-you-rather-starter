import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import QuestionResults from "./QuestionResults";
import QuestionAnswer from "./QuestionAnswer";
import { connect } from 'react-redux';
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";

function QuestionPage(props) {
    const { author, answered, question } = props;

    return (
        !question
            ?   <div className="question-dashboard"><h4>Question Not Found</h4></div>
            :   <div className="question-dashboard">
                    <Card className="question-margin">
                        <CardHeader title={answered ? `Asked by ${author.name}:` : `${author.name} asks:`}/>
                        <div className="question-body">
                            <Avatar className="question-avatar" aria-label="Avatar" src={author.avatarURL}></Avatar>
                            <CardContent className="question-content">
                                {   answered 
                                    ?   <QuestionResults question={question}/>
                                    :   <QuestionAnswer question={question}/>
                                }
                            </CardContent>
                        </div>
                    </Card>
                </div>
    );
}

function mapStateToProps({authedUser, users, questions}, props) {
    const { id } = props.match.params;
    const question = props.match ? questions[props.match.params.id] : props.question;

    return question ? {
        authedUser,
        question,
        answered: Object.keys(users[authedUser].answers).includes(id),
        author: users[question.author],
    } : null
}

export default connect(mapStateToProps)(QuestionPage)