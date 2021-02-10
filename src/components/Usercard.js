import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


class Usercard extends Component {
    render()
    {
        return(
            <div>
            <h3>{this.props.user.id}</h3>
            <img src={this.props.user.avatarURL} alt={this.props.user.id}/>
            <div>Score : {this.props.user.questions.length + Object.keys(this.props.user.answers).length}</div>
            <div>{this.props.user.questions.length} questions asked & {Object.keys(this.props.user.answers).length} questions answered</div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }, { uid }) {
    const user = users[uid]
    return {
        authedUser,
        user
    }
}
export default withRouter(connect(mapStateToProps)(Usercard))