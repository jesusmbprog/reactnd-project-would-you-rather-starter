import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import NotFound from './NotFound'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import Loggin from './Login'

class App extends Component {

  componentDidMount() {
    const { handleInitialData } = this.props;
    handleInitialData();  
  }

  render() {
    const { authedUser } = this.props;

    return (
      <Router>
        {authedUser ?
          <Fragment>
            <LoadingBar />
            <div className='container'>
              <Nav />
              {this.props.loading === true
                ? null
                : <div>
                  <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/question/:id' component={QuestionPage}/>
                    <Route path='/add' component={NewQuestion}/>
                    <Route path='/leaderboard' component={LeaderBoard}/>
                    <Route path='*' component={NotFound}/>
                  </Switch>
                  </div>}
            </div>
          </Fragment>
          : <Loggin></Loggin>
        }
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: bindActionCreators(handleInitialData, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)