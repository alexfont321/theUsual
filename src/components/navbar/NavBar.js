import React, { Component } from "react"
import { Link } from "react-router-dom"
import Logo from "../../images/theusual.png"
import "./NavBar.css"


export default class NavBar extends Component {
    render() {
        return (
            <div id="main-navbar">
            <nav id="main-navbar" className="navbar">
                <div className="navbar-brand">

                    <Link className=""  to="/" id="navItem" href="">
                        <img id="logo" className="navbar-item" src={Logo} alt="The Usual"/></Link>
                </div>
                    <div className="navbar-menu is-active">
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <Link className="has-text-white" to="/">Home</Link>
                            </div>
                            <div className="navbar-item">
                                <Link className="has-text-white" to="/groups">Groups</Link>
                            </div>
                            <div className="navbar-item">
                                <Link className="has-text-white" to="/favorites">My Favorites</Link>
                            </div >
                            <div className="navbar-item">
                                <button className="Logout button is-rounded is-outlined is-inverted is-link" onClick={this.props.handleLogout}>Logout</button></div>
                        </div></div>
            </nav></div>
                )
            }
        }
