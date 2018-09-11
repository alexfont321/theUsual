import React, { Component } from "react";
import dbCalls from "../../modules/DatabaseCalls"

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
                <form onSubmit={this.handleLogin}>
                    <fieldset>
                        <label htmlFor="email">Email: </label>
                        <input type="email" placeholder="Email"
                            onChange={this.handleFieldChange}
                            id="email"
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">Password: </label>
                        <input type="password" placeholder="Password"
                            onChange={this.handleFieldChange}
                            id="password"
                        />
                    </fieldset>
                    <fieldset>
                        <button type="submit">Login</button>
                    </fieldset>
                    <fieldset>
                        <button onClick={this.goToRegister}>Register</button>
                    </fieldset>
                </form>
            </React.Fragment>
        )
    }
}
