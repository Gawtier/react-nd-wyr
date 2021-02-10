import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'


class Navbar extends Component {

    logoff = () => {
        this.props.dispatch(setAuthedUser(""))
    }
    render() {

        return(
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' exact activeClassName='active'>
                            Add a new poll
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' exact activeClassName='active'>
                            Leaderboard
                        </NavLink>
                    </li>
                    <li onClick={this.logoff}>
                        Unlog as {this.props.authedUser}
                    </li>
                </ul>
            </nav>
        )
    }
}

function mapStatetoProps( {authedUser} ) {
    return (
        {
            authedUser
        }
    )

}

export default withRouter(connect(mapStatetoProps)(Navbar))