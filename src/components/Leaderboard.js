import React, { Component } from 'react'
import { connect } from 'react-redux'
import Usercard from './Usercard'
import { withRouter } from 'react-router-dom'



class Leaderboard extends Component {
    render()
    {
        console.log(this.props)
        return(
            <div><h3>This is the leaderboard!</h3>
                {this.props.usersranked.map((user) =>
                    <Usercard uid={user} key={user} />

                )}
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    const usersranked = Object.keys(users).sort((a,b) =>
    (users[b].questions.length+Object.keys(users[b].answers).length) - (users[a].questions.length+Object.keys(users[a].answers).length))
    
    
    console.group("users ranked")
    console.log(usersranked)
    console.groupEnd()

    return {
        authedUser,
        usersranked
    }
}
export default withRouter(connect(mapStateToProps)(Leaderboard))