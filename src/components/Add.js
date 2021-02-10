import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'



class Add extends Component {
    state = 
{
    optionOne:"",
    optionTwo:"",
    hasCreated:false
}

    handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch(handleAddQuestion(this.state.optionOne, this.state.optionTwo))
    this.setState({hasCreated:true})
  }

    render() {
        const { hasCreated } = this.state

        if(hasCreated === true) {
            return <Redirect to='/' />
        }
        return(
            
            <div>
                <h3>Add a new question</h3>
                <form onSubmit={this.handleSubmit}>
                    Would you rather... 
                    <div><input type="text" name="optionOne" onChange={this.handleChange}/></div>
                    <div>or</div> 
                    <div><input type="text" name="optionTwo" onChange={this.handleChange}/> ?</div>
                    <button type="submit">Add</button>
                    </form>


            </div>
        ) 
}
}
function mapStatetoProps( {authedUser, questions} ) {
    return (
        {
            authedUser,
            questions
        }
    )

}
export default withRouter(connect(mapStatetoProps)(Add))