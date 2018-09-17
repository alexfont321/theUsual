import React, { Component } from "react";
import dbCalls from "../../modules/DatabaseCalls"
import "./Login.css"

export default class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = e => {
        e.preventDefault();
        dbCalls.getAll("users")
        .then(users => {
            let userNameExists = users.find(u => u.email === this.state.email && u.password === this.state.password);
            if(userNameExists) {
                sessionStorage.setItem("user", JSON.stringify(userNameExists));
                this.props.history.push("/")
            } else {
                alert ("Your email and password are not correct! Please retry or register a new account")
                this.props.history.push("/register")

            }

        })
        // .then(()=> this.props.history.push("/"))
    }

    goToRegister = e => {
        e.preventDefault();
        this.props.history.push("/register")
    }





    render() {
        return (
            <React.Fragment>
                <div id="login-page-wrapper">
                <div id="spacer"></div>
                {/* <div id="background-image"> */}
                <form onSubmit={this.handleLogin}>
                    <div className="field">
                        <label className="label" htmlFor="email">Email</label>
                        <div className="control">
                        <input type="email" placeholder="Email"
                            onChange={this.handleFieldChange}
                            id="email" className="input is-primary is-rounded"
                        /></div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="password">Password</label>
                        <div className="control">

                        <input type="password" placeholder="Password"
                            onChange={this.handleFieldChange}
                            id="password" className="input is-primary is-rounded"
                        /></div>
                    </div>
                    <div className="field is-grouped" id="buttongroup"> 
                        <button className="button is-rounded is-outlined is-primary is-pulled-left " type="submit">Login</button>

                        <button className="button is-rounded is-outlined is-primary is-pulled-right" onClick={this.goToRegister}>Register</button>
                    </div>
                </form>
                {/* </div> */}
                </div>
            </React.Fragment>
        )
    }
}
