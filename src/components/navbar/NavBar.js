import React, { Component } from "react"
import { Link } from "react-router-dom"


export default class NavBar extends Component {
    render() {
        return (
            <nav id="navbar" className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills">
                <li className="nav-item">
                        <Link className="nav-link text-info" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-info" to="/groups">Groups</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-info" to="/favorites">My Favorites</Link>
                    </li>
                    <button className="Logout btn btn-info" onClick={this.props.handleLogout}>Logout</button>
                </ul>
            </nav>
        )
    }
}
