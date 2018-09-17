import React, { Component } from "react"
import dbCalls from "../../modules/DatabaseCalls"
import "./Register.css"

export default class Register extends Component {

    state = {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleRegister = e => {
        e.preventDefault();
        const newUser = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }
        if (this.state.email && this.state.password && this.state.firstName && this.state.lastName) {
            dbCalls.post("users", newUser).then(() => this.props.history.push("./login"))
        } else {
            alert("please fill all the boxes")
        }


    }

    render() {
        return (
            <React.Fragment>
                <div id="login-page-wrapper">
                    <div id="spacer"></div>
                    <form onSubmit={this.handleRegister}>
                        <div className="field">
                            <label className="label" htmlFor="firstName">First Name</label>
                            <div className="control">

                                <input type="text" placeholder="First Name"
                                    onChange={this.handleFieldChange}
                                    id="firstName" className="input is-primary is-rounded"
                                />
                            </div></div>
                        <div className="field">
                            <label className="label" htmlFor="lastName">Last Name</label>
                            <div className="control">

                                <input type="text" placeholder="Last Name"
                                    onChange={this.handleFieldChange}
                                    id="lastName" className="input is-primary is-rounded"
                                />

                            </div></div>
                        <div className="field">
                            <label className="label" htmlFor="email">Email</label>
                            <div className="control">

                                <input type="email" placeholder="Email"
                                    onChange={this.handleFieldChange}
                                    id="email" className="input is-primary is-rounded"
                                />

                            </div></div>
                        <div className="field">
                            <label className="label" htmlFor="password">Password</label>
                            <div className="control">

                                <input type="password" placeholder="Password"
                                    onChange={this.handleFieldChange}
                                    id="password" className="input is-primary is-rounded"
                                />

                            </div></div>
                        <div className="field is-grouped" id="buttongroup">
                            <button className="button is-rounded is-outlined is-primary is-pulled-left" type="submit">Register</button>
                            <button className="button is-rounded is-outlined is-primary is-pulled-right" onClick={() => this.props.history.push("/login")}>Cancel</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}