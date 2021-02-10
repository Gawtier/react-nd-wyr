import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { withRouter } from 'react-router-dom'


class Login extends Component {
    state = {
        authedUser: '',
        toHome: false,
      }
    handleAuth = (e) => {
        e.preventDefault()

        const { authedUser } = this.state
        authedUser ? this.props.dispatch(setAuthedUser(authedUser)) : this.props.dispatch(setAuthedUser(this.props.usersIds[0]))
      
    } 
    handleChange = (e) => {
        e.preventDefault()

        const user = e.target.value
    
        this.setState(() => ({
          authedUser: user
        }))
      }
    render() {
        console.log(this.props);

               
        return(
            <div>
                <h3>CHOOSE USER </h3>
                <form onSubmit={this.handleAuth}>
                    <select onChange={this.handleChange}>
                        <option disabled default>Who are you ? </option>
                    {this.props.usersIds.map((id) => 
                    
                      <option key={id}>{id}</option>
                    )}
                    </select>

                    <button type="submit">Auth</button>

                    </form>
            </div>
        )
    }
}

// TODO : -> Dropdown avec les noms
// Système d'authentification
// quoi afficher

function mapStatetoProps( {users} ) {
    return (
        {
            usersIds: Object.keys(users)
            .sort((a,b) => users[b].timestamp - users[a].timestamp)
        }
    )

}

export default withRouter(connect(mapStatetoProps)(Login))