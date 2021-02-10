import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class QuestionCard extends Component {
    render() {
        return(
            <div>
                Would you rather 
                <span className="option">{this.props.question.optionOne.text}</span>
                       or 
                <span className="option">{this.props.question.optionTwo.text} </span>
                       ?
                <br/>
                {this.props.hasAnswered === 1 && `Your choice :  ${
                    this.props.question.optionOne.text}`}
                {this.props.hasAnswered === 2 && `Your choice :  ${
                    this.props.question.optionTwo.text}`}


            </div>
        )
    }
}


function mapStateToProps( {authedUser, users, questions}, { qid } ) {
    const question = questions[qid]
    let hasAnswered
    question.optionOne.votes.includes(authedUser) && (hasAnswered = 1)
    question.optionTwo.votes.includes(authedUser) && (hasAnswered = 2)

    return (
        {
            authedUser,
            users,
            question: question 
            ? question 
            : null,
            hasAnswered: hasAnswered ? hasAnswered : 0
        }
    )

}


export default withRouter(connect(mapStateToProps)(QuestionCard))
