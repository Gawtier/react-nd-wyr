import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionCard from './questioncard'
import { Link, withRouter } from 'react-router-dom'


class Dashboard extends Component {
    state = {
        "showAnswered" : false
    }

    handleChangeState = (e) => 
    {
        this.setState(() => ({
            "showAnswered": !this.state.showAnswered
        }))
    }

    render() {
        return(
            <div>
                <h3>Would you rather ? </h3>
                <button onClick={this.handleChangeState}>
                    Show {this.state.showAnswered ? "Unanswered" : "Answered"}
                    </button>
                        {!this.state.showAnswered && (
                            <div><h5>Unanswered questions</h5>
                        
                            {this.props.unansweredQuestionsIds.map((id) => 
                            <div key={id}>
                                <Link to={`/question/${id}`} className='tweet'>
                                    <QuestionCard qid={id}/>
                                </Link>
                            </div>)}
                            </div>)
                        }
                        {this.state.showAnswered && (
                            <div><h5>Answered questions</h5>
                        
                            {this.props.answeredQuestionsIds.map((id) => 
                            <div key={id}>
                                <Link to={`/question/${id}`} className='tweet'>
                                    <QuestionCard qid={id}/>
                                </Link>
                            </div>)}
                            </div>
                        )}


                
            </div>
        )
    }
}

function mapStatetoProps( {questions, authedUser} ) {
    const questionsSorted = Object.values(questions)
    const answeredQuestionsIds = questionsSorted.filter(
        (q) => q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser)
    ).map((q) => q.id).sort( (a,b) => questions[b].timestamp - questions[a].timestamp)

    const unansweredQuestionsIds = questionsSorted.filter(
        (q) => !q.optionOne.votes.includes(authedUser) && !q.optionTwo.votes.includes(authedUser)
    ).map((q) => q.id).sort( (a,b) => questions[b].timestamp - questions[a].timestamp)



    return (
        {
            authedUser,
            questionsIds: Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
            answeredQuestionsIds,
            unansweredQuestionsIds
            
        }
    )

}

export default withRouter(connect(mapStatetoProps)(Dashboard))