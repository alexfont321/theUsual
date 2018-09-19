import React, { Component } from "react"

export default class CreateGroupForm extends Component {
    state = {
        name: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewGroup = e => {
        e.preventDefault();
        if(this.state.name === "") {
            window.alert("Please fill out a group name")

        } else {
            const newGroup = {
                name: this.state.name
            }
            this.props.post("groups", newGroup).then(() => this.props.history.push("/groups"))

        }

    }
    render() {
        return (
            <React.Fragment>
                <section className="hero is-small">
                    <div className="hero-body">
                        <h3 className="title" >Create A New Group</h3>
                    </div>
                </section>
                <div className="columns">

                <form className="form column is-4" onSubmit={this.constructNewGroup}>
                    <div className="field">
                        <label className="label" htmlFor="name">New Group</label>
                        <input type="text"
                               className="form-control input is-rounded is-primary"
                               id="name"
                               onChange={this.handleFieldChange}
                               placeholder="New Group Name" />
                    </div>
                    <div className="field">
                        <button className="button is-rounded is-primary" type="submit">Create New Group</button>
                    </div>

                </form>
            </div>
            </React.Fragment>
        )
    }
}


