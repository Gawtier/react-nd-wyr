import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddAnswer } from '../actions/questions'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'


class Question extends Component {
    state = 
    {
        selectedOption:"optionOne",
        toHome: false,
        questionExist:false

    }

    handleOptionChange = changeEvent => {
        this.setState({
          selectedOption: changeEvent.target.value
        });
      };

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault()
        this.props.dispatch(handleAddAnswer(this.props.question.id, this.state.selectedOption))
        this.setState({hasvoted:this.state.selectedOption})
        this.setState(() => ({toHome: true}))        

      };

      componentDidMount()
      {

        const questionExist = this.props.question ? true : false


        this.setState({questionExist})

        if (questionExist) {
            const hasvoted = this.props.question.optionOne.votes.includes(this.props.authedUser)
            ? "optionOne"
            : (
                this.props.question.optionTwo.votes.includes(this.props.authedUser)
                    ? "optionTwo"
                    : false)

            this.setState({hasvoted})
        }


      }


    render() {
        const { toHome } = this.state
        if(toHome === true) {
            return <Redirect to='/' />
        }
        if (this.state.questionExist) {
            const optionOneVotes = this.props.question.optionOne.votes.length
            const optionTwoVotes = this.props.question.optionTwo.votes.length
            const avatar = this.props.users[this.props.question.author].avatarURL

            return (

                <div>
                    <h1>This is a question by {this.props.question.author}</h1>
                    <div>Would you rather {this.props.question.optionOne.text} ({optionOneVotes} vote(s) - {(optionOneVotes)/(optionOneVotes+optionTwoVotes)*100}%) or {this.props.question.optionTwo.text} ({optionTwoVotes} vote(s) - {(optionTwoVotes)/(optionTwoVotes+optionOneVotes)*100}%)? </div>
                    <div>{this.state.hasvoted
                        && "You have already voted for " + this.props.question[this.state.hasvoted].text}
                    </div>
                    <div>{!this.state.hasvoted && (<div><h3>Would you rather ?</h3>
                        <form onSubmit={this.handleFormSubmit}>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="optionOne"
                                        checked={this.state.selectedOption === "optionOne"}
                                        onChange={this.handleOptionChange}

                                    />
                                    {this.props.question.optionOne.text}
                                    </label>
                            </div>

                            <div className="form-check">
                                <label>
                                    <input
                                        type="radio"
                                        value="optionTwo"
                                        checked={this.state.selectedOption === "optionTwo"}
                                        onChange={this.handleOptionChange}

                                    />
                                    {this.props.question.optionTwo.text}
                                    </label>
                            </div>
                            <div>
                                <button type="submit">
                                    Save
                                </button>
                            </div>
                            

                        </form>
                    </div>)}</div>
                    <img src={avatar} alt={this.props.question.author}/>
                </div>
            

            
        )
    }

    else {
        return(
            <div>This question doesn't exist yet. Create a new one or go back to the homepage!</div>
        )
    }
    }

}

function mapStateToProps({ authedUser, users, questions }, props) {

    const {id} = props.match.params
    const question = questions[id]
    


    return {
        authedUser,
        question,
        users
    }
}

export default withRouter(connect(mapStateToProps)(Question))