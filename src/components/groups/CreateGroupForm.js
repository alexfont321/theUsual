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
                <h3>Create A New Group</h3>
                <form onSubmit={this.constructNewGroup}>
                    <div>
                    <label htmlFor="name">Event</label>
                        <input type="text" required="true"
                               className="form-control" id="name"
                               onChange={this.handleFieldChange}
                               placeholder="New Group Name" />
                    </div>
                    <div>
                        <button type="submit">Create New Group</button>
                    </div>

                </form>
            </React.Fragment>
        )
    }
}


