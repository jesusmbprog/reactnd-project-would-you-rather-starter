import React from "react";
import { connect } from "react-redux";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";

function LeaderBoard(props) {
    const { users, scoreIds } = props;

    return (<ul>
        {scoreIds.map((id) => {
        
            const answeredQuestions = Object.keys(users[id].answers).length;
            const createdQuestions = users[id].questions.length;
            const score = answeredQuestions + createdQuestions;
        
            return (
                <div key={id}>           
                    <div className="question-dashboard">
                        <Card className="question-margin">
                            <CardHeader title={`${users[id].name}`}/>
                            <div className="question-body">
                                <Avatar className="question-avatar" aria-label="Avatar" src={users[id].avatarURL}></Avatar>
                                <CardContent className="question-content">
                                    <Typography component="p" className="question-margin">
                                        Answered Questions: {answeredQuestions}
                                    </Typography>
                                    <Typography component="p" className="question-margin">
                                        Created Questions: {createdQuestions}
                                    </Typography>
                                </CardContent>
                                <div className="score">
                                <Card className="question-margin card-score">
                                    <div className="score-padding question-margin">
                                        Score
                                    </div>
                                    <div className="score-padding score-number-container">
                                        <div className='score-number'>
                                            {score}
                                        </div>
                                    </div>
                                </Card>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            )
        })
     }
    </ul>)
}

function mapStateToProps({ users }) {
    const scoreIds = Object.keys(users)
        .sort((a, b) => (users[b].questions.length + Object.keys(users[b].answers).length)
            - (users[a].questions.length + Object.keys(users[a].answers).length)).slice(0, 3);
    return {
        users,
        scoreIds
    }
}

export default connect(mapStateToProps)(LeaderBoard)