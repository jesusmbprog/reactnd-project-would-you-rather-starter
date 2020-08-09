import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import QuestionList from "./QuestionList";
import { connect } from "react-redux";

function TabContainer({children, dir}) {
    return (
        <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

class Home extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    render() {
        const { theme, answeredQuestionIds, notAnsweredQuestionIds } = this.props;
        return (
            <div className="question-dashboard">
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Unanswered questions"/>
                        <Tab label="Answered questions"/>
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}>
                        <QuestionList questionIds={notAnsweredQuestionIds}/>
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        <QuestionList questionIds={answeredQuestionIds}/>
                    </TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}

Home.propTypes = {
    theme: PropTypes.object.isRequired,
};

function mapStateToProps({users, questions, authedUser}) {
    const userAnswers = users[authedUser].answers;
    return {
        answeredQuestionIds: Object.keys(userAnswers)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        notAnsweredQuestionIds: Object.keys(questions)
            .filter(id => !Object.keys(userAnswers).includes(id))
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(withStyles(null, {withTheme: true})(Home));