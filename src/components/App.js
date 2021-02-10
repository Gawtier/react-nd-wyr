import '../App.css';
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Login from './login'
import Navbar from './navbar'
import Question from './question'
import Add from './Add'
import Leaderboard from './Leaderboard'

class App extends Component {

  componentDidMount()
  {
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    //let id = 'xj352vofupe1dqz9emx13r'

    return (
      <Router>
        {this.props.authedUser ? 
        <Fragment>
          <Navbar />
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/question/:id' component={Question} />
                  <Route path='/add' component={Add} />        
                  <Route path='/leaderboard' component={Leaderboard} />        
                  </Fragment>
        : 
        <Login />}
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)

