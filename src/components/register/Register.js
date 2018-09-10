import React, { Component } from "react"
import dbCalls from "../../modules/DatabaseCalls"

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
                <form onSubmit={this.handleRegister}>
                    <fieldset>
                        <label htmlFor="firstName">First Name: </label>
                        <input type="text" placeholder="First Name"
                        onChange={this.handleFieldChange}
                        id="firstName"
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="lastName">Last Name: </label>
                        <input type="text" placeholder="Last Name"
                        onChange={this.handleFieldChange} 
                        id="lastName"
                        />

                    </fieldset>
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
                        <button type="submit">Register</button>
                        <button onClick={() => this.props.history.push("/login")}>Cancel</button>
                    </fieldset>
                </form>
            </React.Fragment>
        )
    }
}