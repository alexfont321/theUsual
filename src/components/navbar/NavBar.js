import React, { Component } from "react"
import { Link } from "react-router-dom"


export default class NavBar extends Component {
    render() {
        return (
            <nav id="navbar" className="navbar">
                <div className="navbar-brand">
                    <div className="navbar-item">
                        <Link className="nav-link text-info" to="/">Home</Link>
                    </div>
                    <div className="navbar-item">
                        <Link className="nav-link text-info" to="/groups">Groups</Link>
                    </div>
                    <div className="navbar-item">
                        <Link className="nav-link text-info" to="/favorites">My Favorites</Link>
                    </div>
                    <button className="Logout" onClick={this.props.handleLogout}>Logout</button>
                </div>
            </nav>
        )
    }
}
